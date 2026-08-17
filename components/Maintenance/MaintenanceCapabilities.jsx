'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EyebrowMark from '../EyebrowMark';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  shutdown: ['M12 3a9 9 0 1 0 .01 0z', 'M10 9v6', 'M14 9v6'],
  predictive: ['M3 12h4l2-5 4 10 2-5h6'],
  ppm: ['M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M9 12l2 2 4-4'],
  corrective: ['M14.7 6.3a4.5 4.5 0 0 0-6.2 6.2L3 18l3 3 5.5-5.5a4.5 4.5 0 0 0 6.2-6.2L14 13l-3-3 3.7-3.7z'],
  emergency: ['M12 4L2 20h20z', 'M12 10v5', 'M12 17.5h.01'],
  facility: ['M3 21h18', 'M5 21V8l7-5 7 5v13', 'M9 21v-6h6v6', 'M9 12h.01', 'M15 12h.01'],
  electrical: ['M13 2L3 14h9l-1 8L21 10h-9l1-8z'],
  mechanical: ['M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3', 'M5.6 5.6l2.1 2.1', 'M16.3 16.3l2.1 2.1', 'M18.4 5.6l-2.1 2.1', 'M7.7 16.3l-2.1 2.1', 'M12 7a5 5 0 1 0 .01 0z'],
  hvac: ['M3 8h10a4 4 0 1 0-4-4', 'M3 12h13a4 4 0 1 1-4 4', 'M3 16h7a3 3 0 1 1-3 3'],
  amc: ['M6 3h9l3 3v15H6z', 'M9 3v3h6', 'M9 12l2 2 4-4'],
};

const MAINTENANCE = [
  {
    num: '01',
    eyebrow: 'Shutdown & Turnaround',
    title: 'Shutdown & Turnaround',
    desc: 'Planned shutdown and turnaround maintenance for production facilities.',
    label: 'PLANNED OUTAGES',
    icon: 'shutdown',
  },
  {
    num: '02',
    eyebrow: 'Predictive Diagnostics',
    title: 'Predictive Diagnostics',
    desc: 'Advanced predictive maintenance using vibration analysis, thermography, and oil analysis.',
    label: 'CONDITION MONITORING',
    icon: 'predictive',
  },
  {
    num: '03',
    eyebrow: 'Preventive Maintenance (PPM)',
    title: 'Preventive Maintenance (PPM)',
    desc: 'Scheduled preventive maintenance programs to minimize downtime and extend asset life.',
    label: 'SCHEDULED PROGRAMS',
    icon: 'ppm',
  },
  {
    num: '04',
    eyebrow: 'Corrective Maintenance',
    title: 'Corrective Maintenance',
    desc: 'Rapid response corrective maintenance for unexpected equipment failures.',
    label: 'RAPID RESPONSE',
    icon: 'corrective',
  },
  {
    num: '05',
    eyebrow: 'Emergency Breakdown',
    title: 'Emergency Breakdown',
    desc: '24/7 emergency breakdown support with guaranteed response times.',
    label: '24/7 SUPPORT',
    icon: 'emergency',
  },
  {
    num: '06',
    eyebrow: 'Facility Maintenance',
    title: 'Facility Maintenance',
    desc: 'Comprehensive facility maintenance covering all building systems.',
    label: 'BUILDING SYSTEMS',
    icon: 'facility',
  },
  {
    num: '07',
    eyebrow: 'Electrical Maintenance',
    title: 'Electrical Maintenance',
    desc: 'Complete electrical systems maintenance including switchgear, transformers, and distribution.',
    label: 'ELECTRICAL SYSTEMS',
    icon: 'electrical',
  },
  {
    num: '08',
    eyebrow: 'Mechanical Maintenance',
    title: 'Mechanical Maintenance',
    desc: 'Mechanical equipment maintenance including pumps, compressors, and rotating equipment.',
    label: 'ROTATING EQUIPMENT',
    icon: 'mechanical',
  },
  {
    num: '09',
    eyebrow: 'HVAC Servicing',
    title: 'HVAC Servicing',
    desc: 'HVAC system maintenance, repair, and optimization for industrial facilities.',
    label: 'CLIMATE SYSTEMS',
    icon: 'hvac',
  },
  {
    num: '10',
    eyebrow: 'Annual Maintenance Contracts',
    title: 'Annual Maintenance Contracts',
    desc: 'Structured AMCs with defined SLAs, response times, and performance metrics.',
    label: 'SLA-BOUND',
    icon: 'amc',
    final: true,
  },
];

function Chapter({ cap, i }) {
  const [play, setPlay] = useState(false);
  const flip = i % 2 === 1;

  useEffect(() => {
    const onAccent = (e) => { if (e.detail.num === cap.num) setPlay(true); };
    document.addEventListener('ith:eyebrow-accent', onAccent);
    return () => document.removeEventListener('ith:eyebrow-accent', onAccent);
  }, [cap.num]);

  const cls = [
    'ith-mnt-chapter',
    flip ? 'ith-mnt-chapter--flip' : '',
    cap.final ? 'ith-mnt-chapter--final' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={cls} data-index={i} data-num={cap.num}>
      <div className="ith-mnt-chapter-inner">
        <div className="ith-mnt-meta">
          <span className="ith-mnt-ghost" aria-hidden="true">{cap.num}</span>
          <span className="ith-fab-eyebrow" style={{ opacity: 0 }}><EyebrowMark play={play} />{cap.num} / {cap.eyebrow.toUpperCase()}</span>
          <svg className="ith-mnt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[cap.icon].map((p, pi) => <path key={pi} data-draw pathLength="1" d={p} />)}
          </svg>
        </div>
        <div className="ith-mnt-body">
          <h3 className="ith-mnt-title">{cap.title}</h3>
          <p className="ith-mnt-desc">{cap.desc}</p>
          <Link href="/contact" className="ith-fab-cta">
            Explore capability <ArrowRight size={15} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
      <div className="ith-fab-divider" aria-hidden="true">
        <span>{cap.num} / 10</span>
      </div>
    </article>
  );
}

export default function MaintenanceCapabilities() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ith-mnt-chapter-inner', wrap).forEach((inner) => {
          const article = inner.closest('.ith-mnt-chapter');
          const index = Number(article.dataset.index);
          const side = index % 2 === 0 ? -1 : 1;
          const txtSide = -side;
          gsap.set(inner.querySelector('.ith-mnt-meta'), { opacity: 0, scale: 0.95, y: 26, x: 30 * side });
          gsap.set(inner.querySelector('.ith-fab-eyebrow'), { opacity: 0, y: 8 });
          gsap.set(
            [inner.querySelector('.ith-mnt-title'), inner.querySelector('.ith-mnt-desc'), inner.querySelector('.ith-fab-cta')],
            { opacity: 0, y: 26, x: 24 * txtSide }
          );
          gsap.set(inner.querySelector('.ith-mnt-ghost'), { opacity: 0, y: 30 });
        });

        ScrollTrigger.batch('.ith-mnt-chapter-inner', {
          start: 'top 78%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((inner) => {
              const article = inner.closest('.ith-mnt-chapter');
              const index = Number(article.dataset.index);
              const side = index % 2 === 0 ? -1 : 1;
              const txtSide = -side;
              const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
              tl.fromTo(
                inner.querySelector('.ith-mnt-meta'),
                { opacity: 0, scale: 0.95, y: 26, x: 30 * side },
                { opacity: 1, scale: 1, y: 0, x: 0, duration: 1 }
              )
                .fromTo(
                  [inner.querySelector('.ith-mnt-title'), inner.querySelector('.ith-mnt-desc'), inner.querySelector('.ith-fab-cta')],
                  { opacity: 0, y: 26, x: 24 * txtSide },
                  { opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.08 },
                  0.15
                )
                .fromTo(
                  inner.querySelector('.ith-mnt-ghost'),
                  { opacity: 0, y: 30 },
                  { opacity: 0.06, y: 0, duration: 0.9 },
                  0.1
                )
                .fromTo(
                  inner.querySelectorAll('.ith-mnt-icon [data-draw]'),
                  { strokeDashoffset: 1 },
                  { strokeDashoffset: 0, duration: 0.8, stagger: 0.09, ease: 'power2.inOut' },
                  0.4
                )
                .fromTo(
                  inner.querySelector('.ith-fab-eyebrow'),
                  { opacity: 0, y: 8 },
                  { opacity: 1, y: 0, duration: 0.5 },
                  1.3
                )
                .add(() => {
                  document.dispatchEvent(new CustomEvent('ith:eyebrow-accent', { detail: { num: article.dataset.num } }));
                }, 1.3);
            });
          },
        });

        if (!reduced) {
          gsap.utils.toArray('.ith-mnt-meta', wrap).forEach((stage) => {
            gsap.fromTo(
              stage,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: 'none',
                scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
              }
            );
          });

          gsap.utils.toArray('.ith-mnt-ghost', wrap).forEach((ghost) => {
            gsap.fromTo(
              ghost,
              { x: -18 },
              {
                x: 18,
                ease: 'none',
                scrollTrigger: { trigger: ghost, start: 'top bottom', end: 'bottom top', scrub: 1 },
              }
            );
          });
        }

        gsap.fromTo(
          '.ith-mnt-intro > *',
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.ith-mnt-intro', start: 'top 84%', once: true },
          }
        );

        gsap.fromTo(
          '.ith-mnt-conclusion > *',
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.ith-mnt-conclusion', start: 'top 90%', once: true },
          }
        );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className="ith-mnt-wrap" ref={wrapRef}>
      <header className="ith-mnt-intro">
        <span className="ith-fab-intro-tag"><EyebrowMark />Our Capabilities</span>
        <h2 className="ith-mnt-intro-title">Ten disciplines. One accountable maintenance chain.</h2>
        <p className="ith-mnt-intro-sub">Comprehensive services delivered with technical excellence — from planned shutdowns to 24/7 emergency response.</p>
      </header>

      {MAINTENANCE.map((cap, i) => <Chapter key={cap.num} cap={cap} i={i} />)}

      <div className="ith-mnt-conclusion">
        <p className="ith-mnt-conclusion-line">Whatever the asset — a plant, a facility, a critical system — the same precision applies.</p>
        <Link href="/contact" className="ith-fab-cta ith-fab-cta--lg">
          Discuss your maintenance program <ArrowRight size={16} strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
