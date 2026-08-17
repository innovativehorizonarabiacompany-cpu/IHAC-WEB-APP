'use client';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800', '900'] });
import { ArrowRight, ChevronRight } from 'lucide-react';
import GearAssembly from '@/components/IntegratedSolutions/GearAssembly';
import MethodicalDelivery from '@/components/MethodicalDelivery/MethodicalDelivery';

const ACCENT = '#E8A73B';

const solutions = [
  { id: 'contracting', title: 'Contracting & Fabrication', desc: 'Structural steel and metal fabrication, piping systems, site installation, and full project execution from concept to handover.', link: '/solutions/contracting', img: '/images/what_we_deliver/contracting%26fabrication.jpeg' },
  { id: 'automation', title: 'Automation & Panel Integration', desc: 'PLC/SCADA systems, control panel design and fabrication, and multi-vendor integration for process automation.', link: '/solutions/automation', img: '/images/what_we_deliver/automation%26panel_integreation.jpeg' },
  { id: 'maintenance', title: 'Industrial Maintenance', desc: 'Preventive, predictive, and corrective maintenance programs with defined SLAs and rapid breakdown response.', link: '/solutions/maintenance', img: '/images/what_we_deliver/industrial%20maintainence.jpeg' },
  { id: 'creative', title: 'Creative Works', desc: 'POSM, signage, retail displays, packaging, and exhibition materials that bring your brand to life.', link: '/solutions/creative', img: '/images/what_we_deliver/creative_works.png' },
];

/* ── Scroll stagger hook ── */
function useScrollStagger(ref, selector, opts = {}) {
  const { translateY = 40, translateX = 0, opacity = [0, 1], scale = [0.95, 1], delay = anime.stagger(100), duration = 700, easing = 'easeOutExpo', threshold = 0.12, rotateX = 0 } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anime({ targets, translateY, translateX, opacity, scale, delay, duration, easing, rotateX });
          obs.disconnect();
        }
      });
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

export default function SolutionsPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);
  const progressRef = useRef(null);

  /* ── SCROLL PROGRESS BAR ── */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / docH));
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── HERO: word reveal + bar + sub + button + particles ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const words = hero.querySelectorAll('.sol-hero-word');
    const bar = hero.querySelector('.sol-hero-bar');
    const sub = hero.querySelector('.sol-hero-sub');
    const btn = hero.querySelector('.sol-hero-btn');
    const particles = hero.querySelectorAll('.sol-particle');

    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
      targets: words,
      translateY: [60, 0],
      rotateX: [30, 0],
      opacity: [0, 1],
      duration: 900,
      delay: anime.stagger(130),
    }, 200)
    .add({
      targets: bar,
      width: ['0px', '80px'],
      opacity: [0, 1],
      duration: 700,
    }, 200)
    .add({
      targets: sub,
      translateY: [24, 0],
      opacity: [0, 1],
      duration: 700,
    }, 200)
    .add({
      targets: btn,
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .7)',
    }, 300)
    .add({
      targets: particles,
      translateY: [60, 0],
      opacity: [0, 0.15],
      duration: 1000,
      delay: anime.stagger(200),
    }, '-=600');

    return () => tl.pause();
  }, []);

  /* ── CARD 3D TILT ── */
  useEffect(() => {
    const cards = document.querySelectorAll('.sol-card');
    if (!cards.length) return;
    const onMove = (e, card) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
      card.style.setProperty('--tilt-x', `${x}deg`);
      card.style.setProperty('--tilt-y', `${y}deg`);
    };
    const onLeave = (card) => {
      card.style.setProperty('--tilt-x', `0deg`);
      card.style.setProperty('--tilt-y', `0deg`);
    };
    cards.forEach(c => {
      c.addEventListener('mousemove', e => onMove(e, c));
      c.addEventListener('mouseleave', () => onLeave(c));
    });
    return () => {
      cards.forEach(c => {
        c.removeEventListener('mousemove', e => onMove(e, c));
        c.removeEventListener('mouseleave', () => onLeave(c));
      });
    };
  }, []);

  /* ── SECTION HEADER: clip-path stagger ── */
  const animSectionHeader = useCallback((ref) => {
    const el = ref.current;
    if (!el) return;
    const tag = el.querySelector('.sol-section-tag');
    const title = el.querySelector('.sol-section-title');
    const sub = el.querySelector('.sol-section-sub');
    if (!tag && !title) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const tl = anime.timeline({ easing: 'easeOutExpo' });
          if (tag) tl.add({ targets: tag, clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'], opacity: [0, 1], duration: 600 });
          if (tag) {
            const line = tag.querySelector('svg path');
            if (line) tl.add({ targets: line, strokeDashoffset: [anime.setDashoffset, 0], duration: 550 }, 250);
          }
          if (tag) tl.add({}, 400);
          if (title) tl.add({ targets: title, translateY: [24, 0], opacity: [0, 1], duration: 700 }, '-=200');
          if (sub) tl.add({ targets: sub, translateY: [16, 0], opacity: [0, 1], duration: 600 }, '-=300');
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const headerRef1 = useRef(null);

  useEffect(() => { const c1 = animSectionHeader(headerRef1); return () => c1?.(); }, []);

  /* ── SCROLL STAGGERS ── */
  useScrollStagger(gridRef, '.sol-card', { translateY: [70, 0], scale: [0.9, 1], delay: anime.stagger(130), duration: 850, threshold: 0.08 });

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
          tl.add({ targets: h2, opacity: [0, 1], translateY: [30, 0], duration: 650 })
            .add({ targets: p, opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=350')
            .add({ targets: btn, opacity: [0, 1], scale: [0.6, 1], duration: 700, easing: 'easeOutElastic(1, .7)' }, '-=200');
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Sol card renderer ── */
  const renderSolCard = (s) => (
    <Link key={s.id} href={s.link} className="sol-card" style={{ opacity: 0, transform: 'translateY(70px) scale(0.9)' }}>
      <div className="sol-card-bg" style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="sol-card-overlay" />
      <div className="sol-hover-border" />
      <div className="sol-card-glare" />
      <div className="sol-card-content">
        <h3 className="sol-card-title">{s.title}</h3>
        <p className="sol-card-desc">{s.desc}</p>
        <span className="sol-card-cta">
          Explore <ChevronRight size={14} strokeWidth={2} className="sol-card-arrow" />
        </span>
      </div>
    </Link>
  );

  return (
    <div className={montserrat.className}>
      {/* SCROLL PROGRESS */}
      <div className="sol-progress" ref={progressRef} />

      {/* HERO */}
      <section className="sol-hero" ref={heroRef}>
        <div className="sol-hero-bg" />
        <GearAssembly />
        <div className="sol-hero-particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`sol-particle sol-particle-${i + 1}`} style={{ opacity: 0 }} />
          ))}
        </div>
        <div className="sol-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="sol-hero-title">
            {'Integrated Industrial Solutions'.split(' ').map((w, i) => (
              <span key={i} className="sol-hero-word" style={{ opacity: 0, transform: 'translateY(60px) rotateX(30deg)', display: 'inline-block', marginRight: '0.3em' }}>{w}</span>
            ))}
          </h1>
          <div className="sol-hero-bar" style={{ width: 0, opacity: 0 }} />
          <p className="sol-hero-sub" style={{ opacity: 0 }}>A single-source industrial solutions partner delivering contracting &amp; fabrication, automation &amp; panel integration, maintenance, and creative works across Saudi Arabia and the Middle East.</p>
          <div className="sol-hero-btn" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Discuss Your Project <ArrowRight size={18} strokeWidth={1.5} style={{ marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="sol-section">
        <div className="sol-container">
          <div className="sol-section-header" ref={headerRef1}>
            <span className="sol-section-tag" style={{ opacity: 0 }}>
              <svg width="28" height="2" viewBox="0 0 28 2" fill="none" aria-hidden="true"><path d="M0 1 H28" stroke="#E8A73B" strokeWidth="2" /></svg>
              What We Deliver
            </span>
            <h2 className="sol-section-title" style={{ opacity: 0 }}>Four Pillars of <span style={{ color: ACCENT }}>Industrial Excellence</span></h2>
            <p className="sol-section-sub" style={{ opacity: 0 }}>From engineering to execution — every solution is ISO-certified and backed by decades of collective expertise.</p>
          </div>
          <div className="sol-grid" ref={gridRef}>
            {solutions.map(renderSolCard)}
          </div>
        </div>
      </section>

      {/* METHODICAL DELIVERY */}
      <MethodicalDelivery />

      {/* CTA */}
      <section className="sol-section cta-section" ref={ctaRef}>
        <div className="sol-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16, color: '#fff', opacity: 0, transform: 'translateY(30px)' }}>Ready to Build <span style={{ color: ACCENT }}>With Us?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, opacity: 0, transform: 'translateY(16px)' }}>Let&apos;s discuss your industrial project requirements.</p>
          <div style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-primary btn-lg" style={{ transform: 'scale(0.6)' }}>
              Start Your Project <ArrowRight size={18} strokeWidth={1.5} style={{ marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
