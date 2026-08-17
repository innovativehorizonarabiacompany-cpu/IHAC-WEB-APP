'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECHNICAL_SECTORS, TECHNICAL_TOTAL } from './technicalServicesData';
import EyebrowMark from '../EyebrowMark';

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  laser: ['M9 3h6', 'M9 3v3', 'M15 3v3', 'M12 6v7', 'M4 16h16', 'M6 20h12'],
  fiber: ['M5 12a7 7 0 0 1 14 0', 'M9 12a3 3 0 0 1 6 0', 'M12 12v4', 'M4 20h16'],
  cnc: ['M3 12h18', 'M12 3v18', 'M12 7l1.5-2L12 3l-1.5 2z', 'M12 17l1.5 2-1.5 2-1.5-2z', 'M7 12l-2-1.5L3 12l2 1.5z', 'M17 12l2-1.5 2 1.5-2 1.5z'],
  tube: ['M12 5a7 7 0 1 0 .01 0z', 'M12 9v6', 'M9 12h6', 'M7 7l1.5-1.5'],
  plate: ['M3 5h18', 'M3 10h18', 'M3 15h18', 'M3 20h18', 'M14 5v15'],
  precision: ['M3 12h18', 'M12 3v18', 'M12 8l1.5-1.5L12 5l-1.5 1.5z', 'M12 16l1.5 1.5L12 19l-1.5-1.5z', 'M8 12l-1.5-1.5L5 12l1.5 1.5z', 'M16 12l1.5-1.5L19 12l-1.5 1.5z', 'M12 11a1 1 0 1 0 .01 0z'],
  weld: ['M12 3c2 2.5 3.5 4 3.5 6a3.5 3.5 0 0 1-7 0c0-2 1.5-3.5 3.5-6z', 'M17.5 4l1-1.5', 'M6.5 4L5.5 2.5', 'M8 20h8'],
  tig: ['M9 3h6', 'M9 3l-1 6h8l-1-6', 'M8 9h8', 'M10 9v4', 'M14 9v4', 'M12 13v3', 'M12 16a2.5 2.5 0 1 0 .01 0z', 'M9 21h6'],
  mig: ['M12 3a4 4 0 1 0 .01 0z', 'M12 5v4', 'M12 9v5', 'M12 14a2 2 0 0 1 4 0v3', 'M8 20h8'],
  laserWeld: ['M12 4v5', 'M12 4l1.5-1.5', 'M8 12h8', 'M3 15h6', 'M15 15h6', 'M3 19h18'],
  arc: ['M13 2L5 13h5l-2 9L16 11h-5l2-9z', 'M19 5l1 1'],
  spot: ['M12 4a3 3 0 1 0 .01 0z', 'M4.5 11a2 2 0 1 0 .01 0z', 'M19.5 11a2 2 0 1 0 .01 0z', 'M12 17a2 2 0 1 0 .01 0z', 'M7 6a1.5 1.5 0 1 0 .01 0z', 'M17 6a1.5 1.5 0 1 0 .01 0z'],
  industrialWeld: ['M4 5h16', 'M4 19h16', 'M9 5v14', 'M15 5v14', 'M12 12a2 2 0 1 0 .01 0z'],
  steel: ['M4 4h16', 'M4 20h16', 'M12 4v16'],
  structural: ['M4 20V8', 'M20 20V8', 'M4 8h16', 'M8 8l8 12', 'M16 8l-8 12'],
  industrialMetal: ['M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3', 'M5.6 5.6l2.1 2.1', 'M16.3 16.3l2.1 2.1', 'M18.4 5.6l-2.1 2.1', 'M7.7 16.3l-2.1 2.1', 'M12 7a5 5 0 1 0 .01 0z'],
  sheet: ['M4 4h12', 'M4 4v16h12', 'M16 4v7l4 4', 'M16 11h4'],
  stainless: ['M4 4h16', 'M4 20h16', 'M4 4v16', 'M20 4v16', 'M13 4L5 12', 'M19 12l-7 8'],
  heavy: ['M12 2v6', 'M12 8a5 5 0 0 1-5 5', 'M12 8a5 5 0 0 0 5 5', 'M4 21h16'],
  machinery: ['M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3', 'M12 7a5 5 0 1 0 .01 0z', 'M12 7v10', 'M7 12h10'],
};

function SvcIcon({ name }) {
  const d = ICONS[name] || ICONS.machinery;
  return (
    <svg className="ith-tech-svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.map((p, i) => <path key={i} data-draw pathLength="1" d={p} />)}
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 1.5v9M1.5 6h9" />
    </svg>
  );
}

export default function TechnicalCapabilities() {
  const rootRef = useRef(null);
  const reducedRef = useRef(false);
  const [openSectors, setOpenSectors] = useState(() => new Set());
  const [openSvc, setOpenSvc] = useState({});

  const toggleSector = (si) => {
    setOpenSectors((prev) => {
      const next = new Set(prev);
      if (next.has(si)) next.delete(si);
      else next.add(si);
      return next;
    });
  };

  const toggleSvc = (si, vi) => {
    setOpenSvc((prev) => ({ ...prev, [si]: prev[si] === vi ? -1 : vi }));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedRef.current = reduced;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ith-tech-intro > *',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.ith-tech-intro', start: 'top 84%', once: true },
        }
      );
      gsap.utils.toArray('.ith-tech-sector').forEach((sector) => {
        gsap.fromTo(
          sector,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: sector, start: 'top 88%', once: true },
          }
        );
      });
      gsap.fromTo(
        '.ith-tech-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.ith-tech-cta', start: 'top 90%', once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reducedRef.current) return;
    const timer = requestAnimationFrame(() => {
      openSectors.forEach((si) => {
        const body = document.getElementById(`ith-tech-body-${si}`);
        if (!body || body.dataset.staged === '1') return;
        body.dataset.staged = '1';
        const rows = body.querySelectorAll('.ith-tech-svc-row');
        if (!rows.length) return;
        gsap.fromTo(
          rows,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
        );
        const paths = body.querySelectorAll('.ith-tech-svc-icon path');
        if (paths.length) {
          gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap.to(paths, { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: 'power2.inOut', delay: 0.25 });
        }
      });
    });
    return () => cancelAnimationFrame(timer);
  }, [openSectors]);

  return (
    <section className="ith-tech" ref={rootRef} aria-label="Technical capabilities catalogue">
      <div className="ith-tech-intro">
        <span className="ith-fab-intro-tag"><EyebrowMark />Technical Capabilities</span>
        <h2 className="ith-tech-intro-title">Detailed fabrication &amp; processing expertise</h2>
        <p className="ith-tech-intro-sub">
          Laser cutting, welding, steel fabrication and industrial machinery — {TECHNICAL_TOTAL} specialised services
          across four disciplines, each with the full technical detail behind it.
        </p>
        <p className="ith-tech-intro-count">{TECHNICAL_TOTAL} SERVICES / 4 SECTORS</p>
      </div>

      <div className="ith-tech-sectors">
        {TECHNICAL_SECTORS.map((sector, si) => {
          const open = openSectors.has(si);
          const svcOpen = openSvc[si] ?? -1;
          return (
            <div key={sector.num} className={'ith-tech-sector' + (open ? ' open' : '')}>
              <button
                type="button"
                className="ith-tech-sector-head"
                aria-expanded={open}
                aria-controls={`ith-tech-body-${si}`}
                onClick={() => toggleSector(si)}
              >
                <span className="ith-tech-sector-num">{sector.num}</span>
                <span className="ith-tech-sector-name">{sector.name}</span>
                <span className="ith-tech-sector-count">
                  {sector.services.length} {sector.services.length === 1 ? 'service' : 'services'}
                </span>
                <span className="ith-tech-sector-plus"><Plus /></span>
              </button>

              <div className="ith-tech-sector-body" id={`ith-tech-body-${si}`}>
                <div className="ith-tech-sector-inner">
                  <p className="ith-tech-sector-tagline">{sector.tagline}</p>
                  <div className="ith-tech-list">
                    {sector.services.map((s, vi) => {
                      const isOpen = svcOpen === vi;
                      return (
                        <div key={s.num} className={'ith-tech-svc-row' + (isOpen ? ' open' : '')}>
                          <button
                            type="button"
                            className="ith-tech-svc"
                            aria-expanded={isOpen}
                            aria-controls={`ith-tech-panel-${si}-${vi}`}
                            onClick={() => toggleSvc(si, vi)}
                          >
                            <span className="ith-tech-svc-num">{s.num}</span>
                            <SvcIcon name={s.icon} />
                            <span className="ith-tech-svc-txt">
                              <span className="ith-tech-svc-title">{s.title}</span>
                              <span className="ith-tech-svc-intro">{s.intro}</span>
                            </span>
                            <span className="ith-tech-svc-chev"><Plus /></span>
                          </button>
                          <div className={'ith-tech-panel' + (isOpen ? ' open' : '')} id={`ith-tech-panel-${si}-${vi}`}>
                            <div className="ith-tech-panel-inner">
                              <div className="ith-tech-block">
                                <span className="ith-tech-block-label">What It Is</span>
                                <p className="ith-tech-block-text">{s.whatItIs}</p>
                              </div>
                              <div className="ith-tech-block">
                                <span className="ith-tech-block-label">Our Capabilities</span>
                                <ul className="ith-tech-block-list">
                                  {s.capabilities.map((c, ci) => <li key={ci}>{c}</li>)}
                                </ul>
                              </div>
                              <div className="ith-tech-block">
                                <span className="ith-tech-block-label">Typical Applications</span>
                                <p className="ith-tech-block-text">{s.applications}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ith-tech-cta">
        <p className="ith-tech-cta-line">Discuss your project with the fabrication team.</p>
        <Link href="/contact" className="ith-fab-cta ith-fab-cta--lg">
          Request a Quote <ArrowRight size={15} strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}
