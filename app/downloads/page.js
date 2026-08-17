'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { downloadsData } from '@/data/siteData';
import { generatedDownloads } from '@/data/generatedDownloads';
import FormSuccess from '@/components/FormSuccess';
import { revealSafetyNet } from '@/components/revealSafetyNet';

const realCategories = generatedDownloads.categories.filter((c) => c.items.length > 0);
const categories = realCategories.length ? realCategories : downloadsData.categories;
const isReal = realCategories.length > 0;
const selectItems = realCategories.length
  ? realCategories.flatMap((c) => c.items)
  : downloadsData.categories.flatMap((c) => c.items);

const iconFor = (fmt) => (fmt === 'PDF' ? 'fa-file-pdf' : /^(JPE?G|PNG|WEBP|GIF)$/i.test(fmt) ? 'fa-file-image' : 'fa-file');

function ScrollReveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }, { threshold: 0.1 });
    observer.observe(el);
    const net = revealSafetyNet([el]);
    return () => { observer.disconnect(); net(); };
  }, []);
  return <div ref={ref} className="reveal" style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>{children}</div>;
}

export default function DownloadsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(false);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set('formType', 'document-request');
      const res = await fetch('/api/download-request', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="about-theme">
      <style>{`
        .reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }
        .dl-form .ct-field label { color: var(--text); }
        .dl-form .ct-field.focused label { color: #E8A73B; }
        .dl-form .ct-field input, .dl-form .ct-field select, .dl-form .ct-field textarea { background: var(--bg); color: var(--text); border-color: var(--border); }
        .dl-form .ct-field input::placeholder, .dl-form .ct-field textarea::placeholder { color: var(--text-muted); }
      `}</style>
      <section className="pillar-hero" style={{ background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg-alt) 100%)' }}>
        <div className="container pillar-hero-content">
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Downloads & <span className="gradient-text">Resources</span></h1>
          <p className="hero-subtitle" style={{ maxWidth: 700 }}>Access company documents, solution brochures, certifications, case studies, and technical materials for procurement and vendor registration.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {categories.map((cat, i) => (
            <ScrollReveal key={i}>
              <div className="download-section">
                <h3>{cat.name}</h3>
                <div className="download-grid">
                  {cat.items.map((item, j) => (
                    <div key={j} className="download-card">
                      <div className="download-icon"><i className={`fas ${iconFor(item.format)}`} /></div>
                      <div className="download-info">
                        <h4>{item.name}</h4>
                        {item.description && <p>{item.description}</p>}
                        <div className="download-meta">{item.format} &bull; {item.size}</div>
                      </div>
                      {isReal ? (
                        <a className="download-btn" href={item.file} target="_blank" rel="noopener noreferrer" title="View document">
                          <i className="fas fa-eye" />
                        </a>
                      ) : (
                        <button className="download-btn" onClick={() => alert('Download will be available once documents are uploaded.')}>
                          <i className="fas fa-download" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Download Request Form */}
      <section className="section bg-alt">
        <div className="container">
          <ScrollReveal>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Request a <span className="gradient-text">Document</span></h2>
            <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 48 }}>Can&apos;t find what you need? Fill out the form and our team will assist you.</p>
          </ScrollReveal>

          {submitted ? (
            <FormSuccess />
          ) : (
            <form onSubmit={handleSubmit} className="dl-form" style={{ maxWidth: 600, margin: '0 auto', background: 'var(--card-bg)', padding: 36, borderRadius: 'var(--radius)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)' }}>
              <div className="ct-form-row">
                <div className={'ct-field' + (focusedField === 'name' ? ' focused' : '')}>
                  <label>Name *</label>
                  <input type="text" required name="name" placeholder="Your full name" onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
                </div>
                <div className={'ct-field' + (focusedField === 'company' ? ' focused' : '')}>
                  <label>Company *</label>
                  <input type="text" required name="company" placeholder="Company name" onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)} />
                </div>
              </div>
              <div className="ct-form-row">
                <div className={'ct-field' + (focusedField === 'email' ? ' focused' : '')}>
                  <label>Email *</label>
                  <input type="email" required name="email" placeholder="your@email.com" onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
                </div>
                <div className={'ct-field' + (focusedField === 'phone' ? ' focused' : '')}>
                  <label>Phone</label>
                  <input type="tel" name="phone" placeholder="+966 5X XXX XXXX" onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} />
                </div>
              </div>
              <div className={'ct-field' + (focusedField === 'document' ? ' focused' : '')}>
                <label>Document Requested *</label>
                <select required name="document" defaultValue="" onFocus={() => setFocusedField('document')} onBlur={() => setFocusedField(null)}>
                  <option value="" disabled>Select document</option>
                  {selectItems.map((item, i) => (
                    <option key={i} value={item.name}>{item.name}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={'ct-field' + (focusedField === 'notes' ? ' focused' : '')}>
                <label>Project / Requirement Notes</label>
                <textarea rows={4} name="notes" placeholder="Describe the document you need and its purpose..." onFocus={() => setFocusedField('notes')} onBlur={() => setFocusedField(null)} />
              </div>

              {submitError && (
                <div style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: 12 }}>We could not send your request. Please try again or email us directly.</div>
              )}

              <button type="submit" className="btn btn-primary btn-block ct-submit-btn" disabled={sending}>
                {sending ? 'Sending...' : 'Submit Request'} {!sending && <Send size={16} strokeWidth={1.5} style={{ marginLeft: 8 }} />}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="section cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Need Technical <span className="gradient-text">Support?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>Our technical team can help you find the right documentation.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Contact Technical Team <i className="fas fa-arrow-right" /></Link>
        </div>
      </section>
    </div>
  );
}
