'use client';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Leaf, HardHat, ShieldCheck, Globe, FileCheck, ClipboardCheck, TrendingUp } from 'lucide-react';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800', '900'] });
import { siteConfig } from '@/data/siteData';
import TrustSection from '@/components/TrustSection';
import AboutIHAC from '@/components/AboutIHAC/AboutIHAC';
import AboutJourney from '@/components/AboutJourney/AboutJourney';
import { revealSafetyNet } from '@/components/revealSafetyNet';

const ACCENT = '#E8A73B';

function useScrollAnim(selector, opts = {}) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anime({
            targets: e.target,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 700,
            easing: 'easeOutExpo',
            delay: opts.stagger ? anime.stagger(120) : 0,
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    const net = revealSafetyNet(Array.from(els));
    return () => { obs.disconnect(); net(); };
  }, []);
}

function FadeUp({ children, className = '' }) {
  return <div className={'ab-reveal ' + className} style={{ opacity: 0, transform: 'translateY(40px)' }}>{children}</div>;
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const dur = shouldReduceMotion ? 0.01 : undefined;

  const blurUp = { hidden: { opacity: 0, y: 26, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: dur ?? 0.7, ease: [0.16, 1, 0.3, 1] } } };
  const riseUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: dur ?? 0.6, ease: [0.16, 1, 0.3, 1] } } };
  const popIn = { hidden: { opacity: 0, scale: 0.5, rotate: -8 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } } };
  const slideIn = { hidden: { opacity: 0, x: 26 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 220, damping: 24 } } };
  const isoCardV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } } };

  useScrollAnim('.ab-reveal', { stagger: true });

  useEffect(() => {
    if (!heroRef.current) return;
    anime({
      targets: heroRef.current.querySelectorAll('.ab-hero-anim'),
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(200),
    });
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.ab-bento-card');
    if (!cards.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anime({
            targets: e.target,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 600,
            easing: 'easeOutExpo',
            delay: 100,
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(el => obs.observe(el));
    const net = revealSafetyNet(Array.from(cards));
    return () => { obs.disconnect(); net(); };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.ab-split-pane');
    if (!items.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anime({
            targets: e.target.querySelectorAll('.ab-split-inner'),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutExpo',
            delay: anime.stagger(150),
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(el => obs.observe(el));
    const inners = Array.from(items).flatMap((el) => Array.from(el.querySelectorAll('.ab-split-inner')));
    const net = revealSafetyNet(inners);
    return () => { obs.disconnect(); net(); };
  }, []);

  return (
    <div className={montserrat.className}>
      <style>{`.ab-reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>

      {/* HERO */}
      <section className="ab-hero" ref={heroRef}>
        <div className="ab-hero-inner">
          <div className="ab-hero-text">
            <h1 className="ab-hero-anim">Who <span style={{ color: ACCENT }}>We Are</span></h1>
            <p className="ab-hero-anim">A Saudi-based multi-discipline industrial solutions provider with ISO certifications and a proven track record across the Kingdom and the region.</p>
            <div className="ab-hero-stats ab-hero-anim">
              <div><strong>{siteConfig.stats.projects}+</strong> Projects</div>
              <div><strong>{siteConfig.stats.years}+</strong> Years</div>
              <div><strong>{siteConfig.stats.team}+</strong> Team</div>
            </div>
          </div>
          <div className="ab-hero-image ab-hero-anim">
            <img src="/images/ihac-logo-2.png" alt="IHAC" className="ab-hero-logo-img" />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="ab-section ab-section-alt">
        <div className="ab-container">
          <FadeUp>
            <div className="ab-overview">
              <h2>Company <span style={{ color: ACCENT }}>Overview</span></h2>
              <p>Innovative Horizon Arabia Company (IHAC) is a leading provider of tailored solutions for industries, offering expertise in facility development, contracting, fabrication, logistics, and maintenance. With a focus on quality, innovation, and sustainability, we help businesses optimize operations and achieve their goals.</p>
              <Link href="/contact" className="ab-contact-btn">
                Contact Us <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* YOUR TRUSTED PARTNER IN EXCELLENCE */}
      <AboutIHAC />

      {/* OUR JOURNEY */}
      <AboutJourney />

      {/* PARTNERS MARQUEE */}
      <section className="ab-section" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="ab-container" style={{ maxWidth: '100%', padding: 0 }}>
          <div className="ab-section-inner">
            <FadeUp>
              <h2 className="ab-section-title">Our <span style={{ color: ACCENT }}>Partners & Clients</span></h2>
              <p className="ab-section-sub">Trusted by industry leaders across Saudi Arabia.</p>
            </FadeUp>
          </div>
          <div style={{ overflow: 'hidden', width: '100%', display: 'flex', alignItems: 'center', position: 'relative', margin: '40px 0 32px' }}>
            <motion.div
              style={{ display: 'flex', gap: 48, alignItems: 'center', width: 'max-content', paddingRight: 0 }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
            >
              {[...siteConfig.partnerLogos, ...siteConfig.partnerLogos].map((logo, i) => (
                <div key={logo.name + i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 100 }}>
                  <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={logo.img} alt={logo.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#888', textAlign: 'center', fontWeight: 500, maxWidth: 100, lineHeight: 1.3 }}>{logo.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="ab-section-inner" style={{ textAlign: 'center' }}>
            <span className="hero-badge">
              <i className="fas fa-id-card" style={{ marginRight: 6 }} />
              Aramco Vendor ID: {siteConfig.aramcoVendorId}
            </span>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & COMMITMENT */}
      <section className="ab-section">
        <div className="ab-container">
          <motion.div
            className="ab-cert-shell"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div className="ab-cert-media" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: dur ?? 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
              <motion.img
                src="/images/certifications.png"
                alt="ISO 9001, 14001 & 45001 Certifications"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: dur ?? 2.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="ab-cert-overlay"
                variants={{ hidden: { opacity: 0, y: 64 }, visible: { opacity: 1, y: 0, transition: { duration: dur ?? 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1, delayChildren: 0.15 } } }}
              >
                <motion.div variants={popIn}>
                  <ShieldCheck size={40} strokeWidth={1.5} />
                </motion.div>
                <motion.h3 variants={blurUp}>Built on Standards. Delivered with Integrity.</motion.h3>
                <motion.p variants={riseUp}>Internationally recognized quality, environmental, and occupational health &amp; safety certifications ensuring consistent project excellence.</motion.p>
              </motion.div>
            </motion.div>
            <motion.div className="ab-cert-body" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
              <motion.span className="ab-cert-tag" variants={riseUp}>Our Certifications</motion.span>
              <motion.h2 className="ab-cert-title" variants={blurUp}>Quality, Safety &amp; <span style={{ color: '#E8A73B' }}>Environmental</span> Commitment</motion.h2>
              <motion.p className="ab-cert-sub" variants={riseUp}>Internationally recognized management systems that underpin every project we deliver.</motion.p>
              <motion.div
                className="ab-cert-iso-grid"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
              >
                {[
                  { title: 'ISO 9001:2015', subtitle: 'Quality Management System', desc: 'Consistent quality management across design, fabrication, and delivery.', icon: BadgeCheck },
                  { title: 'ISO 14001:2015', subtitle: 'Environmental Management System', desc: 'Responsible environmental practices embedded in every operation.', icon: Leaf },
                  { title: 'ISO 45001:2018', subtitle: 'Occupational Health & Safety', desc: 'Safe working conditions and occupational health for our teams.', icon: HardHat },
                ].map((c, i) => (
                  <motion.div
                    key={c.title}
                    variants={isoCardV}
                    whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    <div className="ab-cert-iso-card">
                      <div className="ab-cert-iso-badge"><c.icon size={32} strokeWidth={1.5} /></div>
                      <h4 className="ab-cert-iso-title">{c.title}</h4>
                      <p className="ab-cert-iso-sub">{c.subtitle}</p>
                      <p className="ab-cert-iso-desc">{c.desc}</p>
                      <Link href="/downloads" className="ab-cert-iso-link">Learn more &rarr;</Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div className="ab-cert-strip" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: dur ?? 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                <motion.div className="ab-cert-strip-grid" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
                  <motion.div className="ab-cert-strip-item" variants={slideIn}><Globe size={22} strokeWidth={1.5} /><span>Internationally Recognized Standards</span></motion.div>
                  <motion.div className="ab-cert-strip-item" variants={slideIn}><FileCheck size={22} strokeWidth={1.5} /><span>Documented Management Systems</span></motion.div>
                  <motion.div className="ab-cert-strip-item" variants={slideIn}><ClipboardCheck size={22} strokeWidth={1.5} /><span>Independently Audited</span></motion.div>
                  <motion.div className="ab-cert-strip-item" variants={slideIn}><TrendingUp size={22} strokeWidth={1.5} /><span>Continuous Improvement</span></motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TrustSection />

      {/* CTA */}
      <section className="ab-section cta-section">
        <div className="ab-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16, color: '#fff' }}>Ready to Work With <span style={{ color: ACCENT }}>Us?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>Let&apos;s discuss your next project.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Start Your Project <i className="fas fa-arrow-right" /></Link>
        </div>
      </section>
    </div>
  );
}
