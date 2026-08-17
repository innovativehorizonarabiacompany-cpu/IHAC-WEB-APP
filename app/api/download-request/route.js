import nodemailer from 'nodemailer';
import { setDefaultResultOrder } from 'node:dns';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import tls from 'node:tls';

// This machine has no IPv6 route to Gmail's SMTP — prefer IPv4 or the
// connection dies with ECONNREFUSED on the resolved IPv6 address.
setDefaultResultOrder('ipv4first');

// AVG antivirus SSL-intercepts outbound SMTP on some local machines. If its
// root CA is present, ADD it to the default trust chain (never replace it —
// replacing the store breaks verification of Gmail's real certificate on
// servers where no interception is happening). On servers without the file,
// normal verification applies.
function loadCaCerts() {
  const p = join(process.cwd(), 'avg-root-ca.pem');
  if (existsSync(p)) return [...tls.rootCertificates, readFileSync(p, 'utf8')];
  return undefined;
}

export async function POST(request) {
  try {
    let body;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      body = Object.fromEntries((await request.formData()).entries());
    }

    const {
      name = '',
      company = '',
      email = '',
      phone = '',
      document = '',
      notes = '',
    } = body;

    if (!name || !email || !document) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ca = loadCaCerts();
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      ...(ca ? { tls: { ca } } : {}),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const subject = `New Document Request from ${name}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL,
      replyTo: email,
      subject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        company ? `Company: ${company}` : null,
        `Document Requested: ${document}`,
        notes ? 'Notes:' : null,
        notes || null,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #111827; margin: 0 0 16px;">New Document Request</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 700; color: #374151; width: 160px;">Name</td>
              <td style="padding: 8px 12px; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 700; color: #374151;">Email</td>
              <td style="padding: 8px 12px; color: #111827;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 12px; font-weight: 700; color: #374151;">Phone</td><td style="padding: 8px 12px; color: #111827;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding: 8px 12px; font-weight: 700; color: #374151;">Company</td><td style="padding: 8px 12px; color: #111827;">${company}</td></tr>` : ''}
            <tr>
              <td style="padding: 8px 12px; font-weight: 700; color: #374151;">Document Requested</td>
              <td style="padding: 8px 12px; color: #111827;">${document}</td>
            </tr>
          </table>
          ${notes ? `<h4 style="margin: 20px 0 8px; color: #374151;">Notes</h4><p style="color: #111827; line-height: 1.6; margin: 0; white-space: pre-wrap;">${notes}</p>` : ''}
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Sent via the IHAC website document request form. Reply to this email to respond directly to the requester.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: 'Request sent successfully' });
  } catch (error) {
    console.error('Document request email error:', error);
    return Response.json(
      { success: false, message: 'Failed to send request' },
      { status: 500 }
    );
  }
}
