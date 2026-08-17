'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800', '900'] });
import {
  MapPin, Phone, Mail, Clock,   AlertTriangle,
  Upload, Send, ArrowRight, ChevronDown,
  Building2, Users, HardHat, Wrench, Palette, HeadphonesIcon,
  FileText, FileCheck, HelpCircle
} from 'lucide-react';
import { siteConfig, departments, faqData } from '@/data/siteData';
import FormSuccess from '@/components/FormSuccess';

const ACCENT = '#E8A73B';

function useScrollStagger(ref, selector, opts = {}) {
  const { translateY = 30, translateX = 0, opacity = [0, 1], scale = [0.95, 1], delay = anime.stagger(100), duration = 600, easing = 'easeOutExpo', threshold = 0.12 } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anime({ targets, translateY, translateX, opacity, scale, delay, duration, easing });
          obs.disconnect();
        }
      });
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function animSectionHeader(ref) {
  const el = ref.current;
  if (!el) return;
  const tag = el.querySelector('.ct-section-tag');
  const title = el.querySelector('.ct-section-title');
  const sub = el.querySelector('.ct-section-sub');
  if (!tag && !title) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const tl = anime.timeline({ easing: 'easeOutExpo' });
        if (tag) tl.add({ targets: tag, clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'], opacity: [0, 1], duration: 500 });
        if (tag) tl.add({}, 300);
        if (title) tl.add({ targets: title, translateY: [20, 0], opacity: [0, 1], duration: 600 }, '-=200');
        if (sub) tl.add({ targets: sub, translateY: [12, 0], opacity: [0, 1], duration: 500 }, '-=300');
        obs.disconnect();
      }
    });
  }, { threshold: 0.12 });
  obs.observe(el);
  return () => obs.disconnect();
}

export default function ContactPage() {
  const [formType, setFormType] = useState('enquiry');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const deptRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const headerRef1 = useRef(null);
  const headerRef2 = useRef(null);
  const headerRef3 = useRef(null);

  /* ── Hero ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const words = hero.querySelectorAll('.ct-hero-word');
    const bar = hero.querySelector('.ct-hero-bar');
    const sub = hero.querySelector('.ct-hero-sub');
    const btns = hero.querySelectorAll('.ct-hero-btn');
    const tl = anime.timeline({ easing: 'easeOutExpo' });
    tl.add({ targets: words, translateY: [50, 0], rotateX: [20, 0], opacity: [0, 1], duration: 800, delay: anime.stagger(130) })
      .add({ targets: bar, width: ['0px', '80px'], opacity: [0, 1], duration: 600 }, 200)
      .add({ targets: sub, translateY: [20, 0], opacity: [0, 1], duration: 600 }, 200)
      .add({ targets: btns, translateY: [20, 0], opacity: [0, 1], duration: 500, delay: anime.stagger(100) }, 300);
    return () => tl.pause();
  }, []);

  /* ── Section headers ── */
  useEffect(() => { const c = animSectionHeader(headerRef1); return () => c?.(); }, []);
  useEffect(() => { const c = animSectionHeader(headerRef2); return () => c?.(); }, []);
  useEffect(() => { const c = animSectionHeader(headerRef3); return () => c?.(); }, []);

  /* ── Scroll staggers ── */
  useScrollStagger(infoRef, '.ct-info-card', { translateX: [-30, 0], delay: anime.stagger(100), duration: 600, threshold: 0.1 });
  useScrollStagger(deptRef, '.ct-dept-card', { translateY: 30, scale: [0.92, 1], delay: anime.stagger(80), duration: 550, threshold: 0.08 });
  useScrollStagger(faqRef, '.ct-faq-item', { translateY: 20, delay: anime.stagger(70), duration: 500, threshold: 0.08 });

  /* ── CTA ── */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const h2 = el.querySelector('h2');
    const p = el.querySelector('p');
    const btn = el.querySelector('.btn');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const tl = anime.timeline({ easing: 'easeOutExpo' });
          tl.add({ targets: h2, opacity: [0, 1], translateY: [30, 0], duration: 600 })
            .add({ targets: p, opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=300')
            .add({ targets: btn, opacity: [0, 1], scale: [0.7, 1], duration: 600, easing: 'easeOutElastic(1, .6)' }, '-=200');
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Form submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(false);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set('formType', formType);
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  const deptIcons = [Building2, HardHat, Wrench, Palette, FileText, Users, HeadphonesIcon];

  return (
    <div className={montserrat.className}>
      {/* HERO */}
      <section className="ct-hero" ref={heroRef}>
        <div className="ct-hero-bg" />
        <div className="ct-container">
          <h1 className="ct-hero-title">
            {'Get In Touch'.split(' ').map((w, i) => (
              <span key={i} className="ct-hero-word" style={{ opacity: 0, transform: 'translateY(50px) rotateX(20deg)', display: 'inline-block', marginRight: '0.3em' }}>{w}</span>
            ))}
          </h1>
          <div className="ct-hero-bar" style={{ width: 0, opacity: 0 }} />
          <p className="ct-hero-sub" style={{ opacity: 0 }}>Send an enquiry, request a quotation, attach drawings or RFQs, or request a site visit. Our team is ready to assist.</p>
          <div className="ct-hero-actions">
            <Link href="#form" className="btn btn-primary btn-lg ct-hero-btn" style={{ opacity: 0 }} onClick={() => setFormType('enquiry')}>
              Send an Enquiry <ArrowRight size={18} strokeWidth={1.5} style={{ marginLeft: 8 }} />
            </Link>
            <Link href="#form" className="btn btn-outline btn-lg ct-hero-btn" style={{ opacity: 0 }} onClick={() => setFormType('site-visit')}>
              Request a Site Visit
            </Link>
            <Link href="#form" className="btn btn-outline btn-lg ct-hero-btn" style={{ opacity: 0 }} onClick={() => setFormType('technical')}>
              Technical Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT OVERVIEW */}
      <section className="ct-section ct-section-alt">
        <div className="ct-container">
          <div className="ct-section-header" ref={headerRef1}>
            <span className="ct-section-tag" style={{ opacity: 0 }}>Contact Us</span>
            <h2 className="ct-section-title" style={{ opacity: 0 }}>How Can We <span style={{ color: ACCENT }}>Help You?</span></h2>
            <p className="ct-section-sub" style={{ opacity: 0 }}>We welcome all types of enquiries — from project requirements and quotations to technical consultations and maintenance support. Share as much detail as possible so our team can prepare the best response.</p>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section id="form" className="ct-section">
        <div className="ct-container">
          <div className="ct-grid">
            {/* FORM */}
            <div ref={formRef}>
              {submitted ? (
                <FormSuccess />
              ) : (
                <form onSubmit={handleSubmit} className="ct-form">
                  {/* Form Type Tabs */}
                  <div className="ct-form-tabs">
                    {[
                      { id: 'enquiry', label: 'Send an Enquiry' },
                      { id: 'site-visit', label: 'Request Site Visit' },
                      { id: 'technical', label: 'Tech Consultation' },
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        className={'ct-form-tab' + (formType === t.id ? ' active' : '')}
                        onClick={() => setFormType(t.id)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="ct-form-row">
                    <div className={'ct-field' + (focusedField === 'firstName' ? ' focused' : '')}>
                      <label>First Name *</label>
                      <input type="text" required name="firstName" placeholder="Your first name" onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)} />
                    </div>
                    <div className={'ct-field' + (focusedField === 'lastName' ? ' focused' : '')}>
                      <label>Last Name *</label>
                      <input type="text" required name="lastName" placeholder="Your last name" onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)} />
                    </div>
                  </div>
                  <div className="ct-form-row">
                    <div className={'ct-field' + (focusedField === 'email' ? ' focused' : '')}>
                      <label>Email *</label>
                      <input type="email" required name="email" placeholder="your@email.com" onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
                    </div>
                    <div className={'ct-field' + (focusedField === 'company' ? ' focused' : '')}>
                      <label>Company *</label>
                      <input type="text" required name="company" placeholder="Company name" onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)} />
                    </div>
                  </div>
                  <div className={'ct-field' + (focusedField === 'phone' ? ' focused' : '')}>
                    <label>Phone</label>
                    <input type="tel" name="phone" placeholder="+966 5X XXX XXXX" onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} />
                  </div>

                  {formType === 'site-visit' && (
                    <div className="ct-form-row">
                      <div className={'ct-field' + (focusedField === 'siteLocation' ? ' focused' : '')}>
                        <label>Site Location *</label>
                        <input type="text" required name="siteLocation" placeholder="Site address or coordinates" onFocus={() => setFocusedField('siteLocation')} onBlur={() => setFocusedField(null)} />
                      </div>
                      <div className={'ct-field' + (focusedField === 'preferredDate' ? ' focused' : '')}>
                        <label>Preferred Date *</label>
                        <input type="date" required name="preferredDate" onFocus={() => setFocusedField('preferredDate')} onBlur={() => setFocusedField(null)} />
                      </div>
                    </div>
                  )}

                  {formType === 'technical' && (
                    <div className={'ct-field' + (focusedField === 'projectType' ? ' focused' : '')}>
                      <label>Project Type *</label>
                      <select required name="projectType" onFocus={() => setFocusedField('projectType')} onBlur={() => setFocusedField(null)}>
                        <option value="">Select project type</option>
                        <option>Industrial Automation</option>
                        <option>Maintenance Services</option>
                        <option>Contracting & Fabrication</option>
                        <option>Creative Works</option>
                        <option>Other</option>
                      </select>
                    </div>
                  )}

                  <div className={'ct-field' + (focusedField === 'enquiryType' ? ' focused' : '')}>
                    <label>Enquiry Type *</label>
                    <select required name="enquiryType" defaultValue="" onFocus={() => setFocusedField('enquiryType')} onBlur={() => setFocusedField(null)}>
                      <option value="" disabled>Select enquiry type</option>
                      <option>Request a Quotation</option>
                      <option>Request a Site Visit</option>
                      <option>Technical Consultation</option>
                      <option>Maintenance Support</option>
                      <option>Emergency Support</option>
                      <option>Vendor Registration</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div className={'ct-field' + (focusedField === 'message' ? ' focused' : '')}>
                    <label>Project Details / Message *</label>
                    <textarea rows={5} required name="message" placeholder="Describe your project, requirements, or enquiry in detail..." onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} />
                  </div>

                  <div className="ct-field">
                    <label className="ct-upload-area">
                      <Upload size={20} strokeWidth={1.25} />
                      <span>Attach Drawings or RFQ</span>
                      <input type="file" name="attachment" multiple />
                    </label>
                    <span className="ct-upload-note">PDF, DWG, DXF, PNG, JPG (Max 10MB)</span>
                  </div>

                  {submitError && (
                    <div className="ct-form-error" style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: 12 }}>We could not send your message. Please try again or email us directly.</div>
                  )}

                  <button type="submit" className="btn btn-primary btn-block ct-submit-btn" disabled={sending}>
                    {sending ? 'Sending...' : formType === 'site-visit' ? 'Request Site Visit' : formType === 'technical' ? 'Request Consultation' : 'Send Enquiry'} {!sending && <Send size={16} strokeWidth={1.5} style={{ marginLeft: 8 }} />}
                  </button>
                </form>
              )}
            </div>

            {/* INFO CARDS */}
            <div className="ct-info-col" ref={infoRef}>
              <div className="ct-info-card" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                <MapPin size={22} strokeWidth={1.25} color={ACCENT} />
                <h4>Office Address</h4>
                <p>{siteConfig.contact.address}</p>
              </div>
              <div className="ct-info-card" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                <Phone size={22} strokeWidth={1.25} color={ACCENT} />
                <h4>Telephone</h4>
                <p>{siteConfig.contact.phone}</p>
              </div>
              <div className="ct-info-card" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                <Mail size={22} strokeWidth={1.25} color={ACCENT} />
                <h4>Email</h4>
                <p>{siteConfig.contact.email}</p>
              </div>
              <div className="ct-info-card" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                <Clock size={22} strokeWidth={1.25} color={ACCENT} />
                <h4>Working Hours</h4>
                <p>{siteConfig.contact.hours}</p>
              </div>
              <div className="ct-info-card ct-info-emergency" style={{ opacity: 0, transform: 'translateX(-30px)' }}>
                <AlertTriangle size={22} strokeWidth={1.25} color="#ef4444" />
                <h4>Emergency Support</h4>
                <p>{siteConfig.contact.emergency}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENT DIRECTORY */}
      <section className="ct-section ct-section-alt">
        <div className="ct-container">
          <div className="ct-section-header" ref={headerRef2}>
            <span className="ct-section-tag" style={{ opacity: 0 }}>Our Team</span>
            <h2 className="ct-section-title" style={{ opacity: 0 }}>Department <span style={{ color: ACCENT }}>Directory</span></h2>
            <p className="ct-section-sub" style={{ opacity: 0 }}>Route your enquiry to the right team.</p>
          </div>
          <div className="ct-dept-grid" ref={deptRef}>
            {departments.map((dept, i) => {
              const Icon = deptIcons[i] || Building2;
              return (
                <div key={i} className="ct-dept-card" style={{ opacity: 0, transform: 'translateY(30px) scale(0.92)' }}>
                  <Icon size={24} strokeWidth={1.25} color={ACCENT} className="ct-dept-icon" />
                  <h4>{dept.name}</h4>
                  <p>{dept.email}</p>
                  <p className="ct-dept-phone">{dept.phone}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ct-section">
        <div className="ct-container">
          <div className="ct-section-header" ref={headerRef3}>
            <span className="ct-section-tag" style={{ opacity: 0 }}>FAQ</span>
            <h2 className="ct-section-title" style={{ opacity: 0 }}>Frequently Asked <span style={{ color: ACCENT }}>Questions</span></h2>
            <p className="ct-section-sub" style={{ opacity: 0 }}>Quick answers to common enquiries.</p>
          </div>
          <div className="ct-faq-list" ref={faqRef}>
            {faqData.slice(0, 5).map((faq, i) => (
              <div key={i} className={'ct-faq-item' + (faqOpen === i ? ' active' : '')} style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className="ct-faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <HelpCircle size={18} strokeWidth={1.25} color={ACCENT} />
                  <span>{faq.q}</span>
                  <ChevronDown size={16} strokeWidth={1.5} className="ct-faq-chevron" />
                </div>
                <div className="ct-faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="ct-section ct-section-alt">
        <div className="ct-container" style={{ textAlign: 'center' }}>
          <div className="ct-section-header" style={{ margin: '0 auto 32px' }}>
            <span className="ct-section-tag">Careers</span>
            <h2 className="ct-section-title">Join Our <span style={{ color: ACCENT }}>Team</span></h2>
            <p className="ct-section-sub" style={{ marginBottom: 24 }}>Interested in career opportunities at IHAC? Send your CV to our HR team.</p>
            <a href="mailto:hr@ihac.ae" className="btn btn-primary">
              Submit Your CV <ArrowRight size={16} strokeWidth={1.5} style={{ marginLeft: 8 }} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ct-section cta-section" ref={ctaRef}>
        <div className="ct-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16, color: '#fff', opacity: 0, transform: 'translateY(30px)' }}>Ready to Start Your <span style={{ color: ACCENT }}>Project?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, opacity: 0, transform: 'translateY(16px)' }}>Let&apos;s build something great together.</p>
          <div style={{ opacity: 0 }}>
            <Link href="#form" className="btn btn-primary btn-lg" style={{ transform: 'scale(0.7)' }}>
              Send Your Enquiry Now <ArrowRight size={18} strokeWidth={1.5} style={{ marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
