import Link from 'next/link';
import { siteConfig } from '@/data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>{siteConfig.name}</h3>
            <p>{siteConfig.description}</p>
            <div className="footer-social">
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href={siteConfig.social.facebook} aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href={siteConfig.social.twitter} aria-label="Twitter"><i className="fab fa-twitter" /></a>
              <a href={siteConfig.social.youtube} aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">Who We Are</Link></li>
              <li><Link href="/solutions">Solutions</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link href="/solutions/automation">Automation</Link></li>
              <li><Link href="/solutions/maintenance">Maintenance</Link></li>
              <li><Link href="/solutions/contracting">Contracting</Link></li>
              <li><Link href="/solutions">Creative Works</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><Link href="/contact">Send Enquiry</Link></li>
              <li><Link href="/downloads">Downloads</Link></li>
              <li><Link href="/contact">Site Visit Request</Link></li>
              <li><Link href="/contact">Technical Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
