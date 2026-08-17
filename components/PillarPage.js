'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Fuel, FlaskConical, Droplets, UtensilsCrossed, Factory, Building2,
  Landmark, ShoppingBag, Cog,
} from 'lucide-react';
import { divisions, processSteps, industriesData, siteConfig } from '@/data/siteData';
import { revealSafetyNet } from '@/components/revealSafetyNet';

const INDUSTRY_ICONS = {
  'Oil & Gas': Fuel,
  'Petrochemical': FlaskConical,
  'Water & Wastewater': Droplets,
  'Food & Beverage': UtensilsCrossed,
  'Manufacturing': Factory,
  'Commercial': Building2,
  'Commercial Facilities': Building2,
  'Infrastructure': Landmark,
  'Retail': ShoppingBag,
};

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

export default function PillarPage({ divisionId, heroImage, heroArt, hideBadge = false, capabilityExperience: CapabilityExperience = null, conclusion = null }) {
  const div = divisions.find(d => d.id === divisionId);
  if (!div) return <div className="container" style={{ padding: '100px 0' }}><h1>Division not found</h1></div>;

  return (
    <div className="about-theme">
      <style>{`.reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }
.pillar-hero .pop-1, .pillar-hero .pop-2, .pillar-hero .pop-3 { opacity: 0; animation: pillarPop 0.7s ease-in-out forwards; }
.pillar-hero .pop-2 { animation-delay: 0.2s; }
.pillar-hero .pop-3 { animation-delay: 0.4s; }
.pillar-hero-photo .pillar-hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); z-index: 0; }
.pillar-hero-photo .hero-title { color: #fff; }
.pillar-hero-photo .hero-subtitle { color: rgba(255,255,255,0.9); }
.pillar-hero-photo .btn-outline { border-color: rgba(255,255,255,0.85); color: #fff; }
.pillar-hero-photo .hero-badge { display: none; }
.pillar-hero-art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3; z-index: 0; pointer-events: none; }
@keyframes pillarPop { 0% { opacity: 0; transform: translateY(24px) scale(0.94); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
`}</style>

      {/* Hero */}
      <section
        className={`pillar-hero${heroImage ? ' pillar-hero-photo' : ''}`}
        style={
          heroImage
            ? { backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: `linear-gradient(135deg, ${div.color}11, ${div.color}22)` }
        }
      >
        <div className="pillar-hero-bg" style={heroImage ? undefined : { background: `radial-gradient(circle at 30% 50%, ${div.color}15 0%, transparent 60%)` }} />
        {heroArt && <img className="pillar-hero-art" src={heroArt} alt="" />}
        {heroImage && <div className="pillar-hero-overlay" />}
        <div className="container pillar-hero-content">
          {!hideBadge && <span className="hero-badge">{div.shortTitle}</span>}
          <h1 className="hero-title pop-1" style={{ fontSize: '2.8rem' }}>{div.title}</h1>
          <p className="hero-subtitle pop-2" style={{ maxWidth: 700 }}>{div.summary}</p>
          <div className="hero-actions pop-3">
            <Link href="/contact" className="btn btn-primary btn-lg">Request Consultation <i className="fas fa-arrow-right" /></Link>
            <Link href="/industries" className="btn btn-outline btn-lg">View Industries</Link>
          </div>
        </div>
      </section>

      {/* Overview / Capabilities / Showcase — replaced by the capability experience when provided */}
      {CapabilityExperience ? (
        <CapabilityExperience />
      ) : (
        <>
          {div.overview !== false && (
            <section className="section">
              <div className="container">
                <ScrollReveal>
                  <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                    <span className="section-tag">Overview</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>About Our <span className="gradient-text">{div.shortTitle}</span> Services</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.8 }}>{div.summary} Our team of certified engineers and technicians brings decades of combined experience to every project, ensuring delivery that meets the highest standards of quality and safety.</p>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* Capabilities */}
          <section className="section bg-alt">
            <div className="container">
              <ScrollReveal>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Our <span className="gradient-text">Capabilities</span></h2>
                <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 48 }}>Comprehensive services delivered with technical excellence.</p>
              </ScrollReveal>
              <div className="cap-grid">
                {div.capabilities.map((cap, i) => (
                  <ScrollReveal key={i}>
                    <div className="cap-card">
                      <h4>{cap.title}</h4>
                      <p>{cap.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Showcase */}
          {div.showcase && (
            <section className="ithrion-panels-wrap">
              <div className="ithrion-panels-header">
                <div className="ithrion-bento-tag">Showcase</div>
                <h2 className="ithrion-bento-title">Our <span className="gradient-text">{div.shortTitle}</span> Works</h2>
                <p className="ithrion-bento-sub">{div.showcaseSub}</p>
              </div>
              <div className="ithrion-panels-grid">
                {div.showcase.map((src, i) => (
                  <div key={i} className="ithrion-panel-item">
                    <img src={src} alt={`${div.shortTitle} work ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Panel Types / Services (division-specific) */}
      {div.panelTypes && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Panel Types We <span className="gradient-text">Manufacture</span></h2>
              <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 48 }}>{div.panelTypes.length}+ panel configurations available.</p>
            </ScrollReveal>
            <div className="tag-list" style={{ justifyContent: 'center' }}>
              {div.panelTypes.map((t, i) => <span key={i} className="tag">{t}</span>)}
            </div>
          </div>
        </section>
      )}

      {/* Brands (Automation-specific) */}
      {div.brands && (
        <section className="section bg-alt">
          <div className="container">
            <ScrollReveal>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Partner <span className="gradient-text">Brands</span></h2>
              <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 48 }}>We work with world-leading automation manufacturers.</p>
            </ScrollReveal>
            <div className="tag-list" style={{ justifyContent: 'center' }}>
              {div.brands.map((b, i) => <span key={i} className="tag" style={{ fontSize: '0.9rem', padding: '6px 20px' }}>{b}</span>)}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {div.process && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 48 }}>Engineering <span className="gradient-text">Process</span></h2>
            </ScrollReveal>
            <div className="process-timeline">
              {div.process.map((step, i) => (
                <ScrollReveal key={i}>
                  <div className="process-step">
                    <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                    <div className="step-content"><h4>{step}</h4></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industries */}
      <section className="section bg-alt">
        <div className="container">
          <ScrollReveal>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: div.empowerIntro ? 8 : 48 }}>
              Industries <span className="gradient-text">{div.empowerIntro ? 'We Empower' : 'Served'}</span>
            </h2>
            {div.empowerIntro && (
              <p style={{ textAlign: 'center', color: 'var(--text-light)', maxWidth: 640, margin: '0 auto 48px', fontSize: '1.02rem', lineHeight: 1.7 }}>{div.empowerIntro}</p>
            )}
          </ScrollReveal>
          <div className="industries-grid">
            {div.industries.map((ind, i) => {
              const Icon = INDUSTRY_ICONS[ind] || Cog;
              return (
                <ScrollReveal key={i}>
                  <div className="industry-item">
                    <Icon size={40} strokeWidth={1.25} style={{ margin: '0 auto 12px', color: 'var(--primary)', display: 'block' }} />
                    <h4>{ind}</h4>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      {conclusion ? conclusion : (
        <section className="section cta-section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Ready to Get <span className="gradient-text">Started?</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>Contact our {div.shortTitle} team for a consultation.</p>
            <Link href="/contact" className="btn btn-primary btn-lg">Contact Us <i className="fas fa-arrow-right" /></Link>
          </div>
        </section>
      )}
    </div>
  );
}
