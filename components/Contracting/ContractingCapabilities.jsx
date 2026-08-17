'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Fabrication3DViewer from './Fabrication3DViewer';
import TechnicalCapabilities from './TechnicalCapabilities';
import EyebrowMark from '../EyebrowMark';

gsap.registerPlugin(ScrollTrigger);

const IMG = (f) => `/Contracting_fabrication/${f}`;

function IconFrame({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const ICONS = {
  metal: (
    <IconFrame>
      <path data-draw pathLength="1" d="M4 21V8l8-5 8 5v13" />
      <path data-draw pathLength="1" d="M4 13h16" />
      <path data-draw pathLength="1" d="M8 17h8" />
      <path data-draw pathLength="1" d="M12 8v5" />
    </IconFrame>
  ),
  steel: (
    <IconFrame>
      <path data-draw pathLength="1" d="M3 21V6l9 8V6l9 8v7" />
      <path data-draw pathLength="1" d="M3 21h18" />
      <path data-draw pathLength="1" d="M7 8v5M17 8v5" />
    </IconFrame>
  ),
  cabins: (
    <IconFrame>
      <rect data-draw pathLength="1" x="3" y="4" width="18" height="7" rx="1" />
      <rect data-draw pathLength="1" x="3" y="13" width="18" height="7" rx="1" />
      <path data-draw pathLength="1" d="M8 4v7M16 4v7M8 13v7M16 13v7" />
    </IconFrame>
  ),
  civil: (
    <IconFrame>
      <path data-draw pathLength="1" d="M3 20h18" />
      <path data-draw pathLength="1" d="M5 16h14" />
      <path data-draw pathLength="1" d="M7 12h10" />
      <path data-draw pathLength="1" d="M9 8h6" />
      <path data-draw pathLength="1" d="M11 4h2" />
    </IconFrame>
  ),
  install: (
    <IconFrame>
      <path data-draw pathLength="1" d="M12 3v7" />
      <path data-draw pathLength="1" d="M8 10h8" />
      <path data-draw pathLength="1" d="M8 10a4 4 0 0 0 8 0" />
      <path data-draw pathLength="1" d="M6 21V14h12v7" />
    </IconFrame>
  ),
  piping: (
    <IconFrame>
      <path data-draw pathLength="1" d="M3 6h5" />
      <path data-draw pathLength="1" d="M3 10h5" />
      <path data-draw pathLength="1" d="M8 6a4 4 0 0 1 4 4v8" />
      <path data-draw pathLength="1" d="M12 18h5" />
    </IconFrame>
  ),
  project: (
    <IconFrame>
      <rect data-draw pathLength="1" x="4" y="3" width="16" height="18" rx="1" />
      <path data-draw pathLength="1" d="M8 8h8M8 12h5" />
      <path data-draw pathLength="1" d="M8 16l2 2 4-4" />
    </IconFrame>
  ),
  coating: (
    <IconFrame>
      <path data-draw pathLength="1" d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path data-draw pathLength="1" d="M12 8v5" />
      <path data-draw pathLength="1" d="M9.5 10.5h5" />
    </IconFrame>
  ),
};

const CAPABILITIES = [
  {
    num: '01',
    eyebrow: 'Metal Fabrication',
    title: 'Metal Fabrication',
    desc: 'General metal fabrication including custom equipment, tanks, and structures.',
    img: IMG('2_inch_coil_rolling_works.png'),
    pos: '50% 55%',
    label: 'FIELD FABRICATION',
    icon: ICONS.metal,
  },
  {
    num: '02',
    eyebrow: 'Structural Steel Fabrication',
    title: 'Structural Steel Fabrication',
    desc: 'Custom structural steel platforms, supports, and frameworks for industrial facilities.',
    img: IMG('Steel_Structure_Fabrication_Flanges,_Paddle_Clamps_Cutting.png'),
    pos: '50% 45%',
    label: 'STRUCTURAL STEELWORK',
    icon: ICONS.steel,
  },
  {
    num: '03',
    eyebrow: 'Porta Cabins',
    title: 'Porta Cabins',
    desc: 'Design, fabrication, and installation of modular porta cabins for site offices and accommodations.',
    img: IMG('porta-cabins.jpeg'),
    pos: '50% 50%',
    label: 'MODULAR STRUCTURES',
    icon: ICONS.cabins,
    large: true,
  },
  {
    num: '04',
    eyebrow: 'Civil Works',
    title: 'Civil Works',
    desc: 'Associated civil works including foundations, flooring, and site preparation.',
    img: IMG('civil-work.png'),
    pos: '50% 50%',
    label: 'SITE WORKS',
    icon: ICONS.civil,
    editorial: true,
  },
  {
    num: '05',
    eyebrow: 'Site Installation',
    title: 'Site Installation',
    desc: 'Complete site installation services including equipment positioning and integration.',
    img: IMG('Aldawa-Group.jpg'),
    pos: '50% 50%',
    label: 'SITE INSTALLATION',
    icon: ICONS.install,
  },
  {
    num: '06',
    eyebrow: 'Piping Systems',
    title: 'Piping Systems',
    desc: 'Industrial piping fabrication and installation for process and utility systems.',
    img: IMG('HDEP-Piping-SADARA.png'),
    pos: '50% 50%',
    label: 'PIPEWORK',
    icon: ICONS.piping,
  },
  {
    num: '07',
    eyebrow: 'Project Management',
    title: 'Project Management',
    desc: 'End-to-end project management with engineering support and quality control.',
    img: IMG('Transportation_Saddle.jpg'),
    pos: '50% 40%',
    label: 'PROJECT DELIVERY',
    icon: ICONS.project,
    whitespace: true,
  },
  {
    num: '08',
    eyebrow: 'Surface Preparation & Coating',
    title: 'Surface Preparation & Coating',
    desc: 'Industrial surface preparation, painting, and protective coating applications.',
    img: IMG('fabrication-handrail-2026.png'),
    pos: '50% 50%',
    label: 'SURFACE FINISHING',
    icon: ICONS.coating,
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
    'ith-fab-chapter',
    flip ? 'ith-fab-chapter--flip' : '',
    cap.large ? 'ith-fab-chapter--large' : '',
    cap.editorial ? 'ith-fab-chapter--editorial' : '',
    cap.whitespace ? 'ith-fab-chapter--whitespace' : '',
    cap.final ? 'ith-fab-chapter--final' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={cls} data-index={i} data-num={cap.num}>
      <div className="ith-fab-chapter-inner">
        <div className="ith-fab-figure">
          <div className="ith-fab-img" style={{ '--fab-pos': cap.pos }}>
            <img src={cap.img} alt={`${cap.title} — ${cap.label.toLowerCase()}`} loading="lazy" decoding="async" />
            <span className="ith-fab-label">{cap.label}</span>
            <span className="ith-fab-figidx">FIG. {cap.num}</span>
          </div>
        </div>
        <div className="ith-fab-body">
          <span className="ith-fab-ghost" aria-hidden="true">{cap.num}</span>
          <span className="ith-fab-eyebrow" style={{ opacity: 0 }}><EyebrowMark play={play} />{cap.num} / {cap.eyebrow.toUpperCase()}</span>
          <h3 className="ith-fab-title">{cap.title}</h3>
          <div className="ith-fab-icon">{cap.icon}</div>
          <p className="ith-fab-desc">{cap.desc}</p>
          <Link href="/contact" className="ith-fab-cta">
            Explore capability <ArrowRight size={15} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
      <div className="ith-fab-divider" aria-hidden="true">
        <span>{cap.num} / 08</span>
      </div>
    </article>
  );
}

export default function ContractingCapabilities() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ith-fab-chapter-inner', wrap).forEach((inner) => {
          const article = inner.closest('.ith-fab-chapter');
          const index = Number(article.dataset.index);
          const imgSide = index % 2 === 0 ? -1 : 1;
          const txtSide = -imgSide;
          gsap.set(inner.querySelector('.ith-fab-img'), { opacity: 0, scale: 0.96, x: 32 * imgSide });
          gsap.set(
            [inner.querySelector('.ith-fab-title'), inner.querySelector('.ith-fab-desc'), inner.querySelector('.ith-fab-cta')],
            { opacity: 0, y: 26, x: 24 * txtSide }
          );
          gsap.set(inner.querySelector('.ith-fab-eyebrow'), { opacity: 0, y: 8 });
          gsap.set(inner.querySelector('.ith-fab-ghost'), { opacity: 0, y: 30 });
        });

        ScrollTrigger.batch('.ith-fab-chapter-inner', {
          start: 'top 78%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((inner) => {
              const article = inner.closest('.ith-fab-chapter');
              const index = Number(article.dataset.index);
              const imgSide = index % 2 === 0 ? -1 : 1;
              const txtSide = -imgSide;
              const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
              tl.fromTo(
                inner.querySelector('.ith-fab-img'),
                { opacity: 0, scale: 0.96, x: 32 * imgSide },
                { opacity: 1, scale: 1, x: 0, duration: 1 }
              )
                .fromTo(
                  [inner.querySelector('.ith-fab-title'), inner.querySelector('.ith-fab-desc'), inner.querySelector('.ith-fab-cta')],
                  { opacity: 0, y: 26, x: 24 * txtSide },
                  { opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.08 },
                  0.15
                )
                .fromTo(
                  inner.querySelector('.ith-fab-ghost'),
                  { opacity: 0, y: 30 },
                  { opacity: 0.06, y: 0, duration: 0.9 },
                  0.1
                )
                .fromTo(
                  inner.querySelectorAll('[data-draw]'),
                  { strokeDashoffset: 1 },
                  { strokeDashoffset: 0, duration: 0.75, stagger: 0.08, ease: 'power2.inOut' },
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
          gsap.utils.toArray('.ith-fab-figure', wrap).forEach((fig) => {
            const img = fig.querySelector('.ith-fab-img');
            if (!img) return;
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                  trigger: fig,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              }
            );
          });

          gsap.utils.toArray('.ith-fab-ghost', wrap).forEach((ghost) => {
            gsap.fromTo(
              ghost,
              { x: -18 },
              {
                x: 18,
                ease: 'none',
                scrollTrigger: {
                  trigger: ghost,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              }
            );
          });
        }

        const threeHead = wrap.querySelector('.ith-fab-3d-head');
        if (threeHead) {
          gsap.fromTo(
            threeHead.children,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'expo.out',
              scrollTrigger: { trigger: threeHead, start: 'top 82%', once: true },
            }
          );
        }

        gsap.fromTo(
          '.ith-fab-intro > *',
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.ith-fab-intro', start: 'top 84%', once: true },
          }
        );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className="ith-fab-wrap" ref={wrapRef}>

      <header className="ith-fab-intro">
        <span className="ith-fab-intro-tag"><EyebrowMark />Capabilities</span>
        <h2 className="ith-fab-intro-title">Eight disciplines. One accountable delivery chain.</h2>
        <p className="ith-fab-intro-sub">From first cut to final coat — every capability is engineered in-house and delivered on site.</p>
      </header>

      {CAPABILITIES.map((cap, i) => <Chapter key={cap.num} cap={cap} i={i} />)}

      <TechnicalCapabilities />

      <section className="ith-fab-3d-section" aria-label="Fabrication in 3D">
        <div className="ith-fab-3d-head">
          <span className="ith-fab-intro-tag"><EyebrowMark />In 3D</span>
          <h2 className="ith-fab-3d-title">Fabrication, rendered in three dimensions</h2>
          <p className="ith-fab-3d-sub">Industrial staircases, processing tanks and tanker trucks — inspect the engineering.</p>
        </div>
        <Fabrication3DViewer />
      </section>
    </div>
  );
}
