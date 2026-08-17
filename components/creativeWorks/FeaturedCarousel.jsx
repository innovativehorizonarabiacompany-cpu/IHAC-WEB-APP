'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { animate, AnimatePresence, easeInOut, motion, useMotionValue } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  Lightbulb,
  ListChecks,
  MapPin,
  TrendingUp,
  TriangleAlert,
  X,
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import styles from './creative.module.css';

export const FEATURED_PROJECTS = [
  {
    id: 0,
    category: 'Conference & Exhibition',
    title: 'International PX Congress',
    client: 'KSA Committee',
    location: 'Riyadh, Saudi Arabia',
    scope: ['Conference Management', 'Production', 'Hospitality'],
    image: '/images/event_management/international_PX_confress - Copy.png',
    details: [
      {
        label: 'Overview',
        body: 'A flagship two-day congress for the KSA Committee — full conference management, stage production and VIP hospitality for 600+ delegates in Riyadh.',
        icon: Eye,
      },
      {
        label: 'Challenge',
        body: 'A compressed production window and a high-profile government audience demanded absolute precision across every touchpoint.',
        icon: TriangleAlert,
      },
      {
        label: 'IHAC Solution',
        body: 'Single-team delivery: conference management, technical production and hospitality managed as one integrated programme.',
        icon: Lightbulb,
      },
      {
        label: 'Deliverables',
        items: ['Conference management', 'Stage & scenic production', 'Speaker & agenda management', 'VIP hospitality'],
        icon: ListChecks,
      },
      {
        label: 'Execution',
        body: 'Sequenced 12-day build with rehearsed show-calls, bilingual AV coverage and a 24/7 on-site operations room.',
        icon: Layers,
      },
      {
        label: 'Outcome',
        body: 'Delivered on schedule with zero incidents — followed by an immediate repeat engagement.',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 1,
    category: 'Flagship Symposium',
    title: 'Quality Symposium',
    client: 'Eastern Health Cluster',
    location: 'Dammam, Saudi Arabia',
    scope: ['Conference Management', 'Production', 'Logistics'],
    image: '/images/event_management/interior_shot_with_guest - Copy.png',
    details: [
      {
        label: 'Overview',
        body: 'A multi-track healthcare symposium produced for the Eastern Health Cluster — conference management, production and logistics across a full day of sessions.',
        icon: Eye,
      },
      {
        label: 'Challenge',
        body: 'Three parallel tracks, senior health-sector speakers and strict content governance created a complex operational puzzle.',
        icon: TriangleAlert,
      },
      {
        label: 'IHAC Solution',
        body: 'An end-to-end conference unit: content engineering, stage design, speaker logistics and full on-site production.',
        icon: Lightbulb,
      },
      {
        label: 'Deliverables',
        items: ['Conference management', 'Multi-track production', 'Speaker logistics', 'Registration & operations'],
        icon: ListChecks,
      },
      {
        label: 'Execution',
        body: 'Parallel-stage delivery with dedicated track directors, live switching and coordinated delegate movement.',
        icon: Layers,
      },
      {
        label: 'Outcome',
        body: 'All tracks ran to plan with strong delegate engagement and positive leadership feedback.',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 2,
    category: 'Corporate Inauguration',
    title: 'AMCO Inauguration',
    client: 'Advanced Military Clothing Industries Co.',
    location: 'Dammam, Saudi Arabia',
    scope: ['Full Event Production', 'Staging', 'Logistics'],
    image: '/images/event_management/event_interior_high_profile - Copy.png',
    details: [
      {
        label: 'Overview',
        body: 'The corporate inauguration of Advanced Military Clothing Industries Co. — full event production, staging and logistics in Dammam.',
        icon: Eye,
      },
      {
        label: 'Challenge',
        body: 'A ceremonial milestone with VIP guests and press demanded protocol-grade precision and discreet, secure execution.',
        icon: TriangleAlert,
      },
      {
        label: 'IHAC Solution',
        body: 'Full production and staging built around ceremony choreography, VIP flow and seamless technical delivery.',
        icon: Lightbulb,
      },
      {
        label: 'Deliverables',
        items: ['Full event production', 'Staging & scenic', 'Protocol & VIP flow', 'Press & guest logistics'],
        icon: ListChecks,
      },
      {
        label: 'Execution',
        body: 'Rehearsal-driven ceremony with synchronised cues, dual-redundant AV and coordinated guest management.',
        icon: Layers,
      },
      {
        label: 'Outcome',
        body: 'A flawless inauguration that reinforced the company\u2019s standing with dignitaries and media.',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 3,
    category: 'Community & Education',
    title: 'Education & Community Event',
    client: 'School Engagement Program',
    location: 'Eastern Province',
    scope: ['Event Management', 'Production', 'Logistics'],
    image: '/images/event_management/EDUCATION_AND_COMMUNITY_EVENT.png',
    details: [
      {
        label: 'Overview',
        body: 'A community and education event delivered for the School Engagement Program across the Eastern Province.',
        icon: Eye,
      },
      {
        label: 'Challenge',
        body: 'Multiple schools, young audiences and public venues required safety-first planning and a flexible, family-friendly production.',
        icon: TriangleAlert,
      },
      {
        label: 'IHAC Solution',
        body: 'Complete event management and production — programme design, staging and logistics run as one coordinated delivery.',
        icon: Lightbulb,
      },
      {
        label: 'Deliverables',
        items: ['Event management', 'Programme design', 'Production & staging', 'Safety & logistics'],
        icon: ListChecks,
      },
      {
        label: 'Execution',
        body: 'Youth-focused content, controlled crowd flow and trained floor teams kept every session safe and engaging.',
        icon: Layers,
      },
      {
        label: 'Outcome',
        body: 'High participation across all schools with overwhelmingly positive community feedback.',
        icon: TrendingUp,
      },
    ],
  },
];

const N = FEATURED_PROJECTS.length;
const GAP = 16;
const MOD = (k) => ((k % N) + N) % N;

const EASE = [0.42, 0, 0.58, 1];

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const textItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const lineItem = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

const panelRows = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.45, ease: EASE } },
};

const rowIcon = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const rowHead = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const rowBody = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function FeaturedCarousel() {
  const regionRef = useRef(null);
  const stripRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, dx: 0, vel: 0, lastX: 0, lastT: 0, swiping: false, justSwiped: false });
  const pauseTimer = useRef(null);
  const prevW = useRef(0);
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const stripX = useMotionValue(0);

  const active = MOD(pos);
  const [prevActive, setPrevActive] = useState(active);
  if (prevActive !== active) {
    setPrevActive(active);
    setOpen(false);
  }
  const isMobile = width > 0 && width < 680;
  const ratio = isMobile ? 1 : width < 1180 ? 0.72 : 0.74;
  const slideW = width * ratio;
  const step = slideW + GAP;
  const targetX = isMobile ? -pos * step : -pos * step + (width - slideW) / 2;
  const viewportH = Math.round(slideW * 0.625) + (isMobile ? 340 : 0);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (prevW.current > 0 && width > 0) {
      const controls = animate(stripX, targetX, { duration: 0.8, ease: easeInOut });
      prevW.current = width;
      return () => controls.stop();
    }
    stripX.set(targetX);
    prevW.current = width;
  }, [targetX, width, stripX]);

  const hold = useCallback(() => {
    setPaused(true);
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 4000);
  }, []);

  const go = useCallback(
    (dir) => {
      setPos((p) => p + dir);
      hold();
    },
    [hold]
  );

  const navTo = useCallback(
    (idx) => {
      setPos((p) => {
        const k = idx + Math.round((p - idx) / N) * N;
        return k === p ? p + N : k;
      });
      hold();
    },
    [hold]
  );

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setPaused(false), 2500);
      pauseTimer.current = t;
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (paused || open) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, open, go]);

  useEffect(() => {
    return () => clearTimeout(pauseTimer.current);
  }, []);

  useEffect(() => {
    const next = FEATURED_PROJECTS[MOD(active + 1)].image;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = next;
    document.head.appendChild(link);
    return () => link.remove();
  }, [active]);

  const onPointerDown = (e) => {
    const s = dragState.current;
    s.active = true;
    s.startX = e.clientX;
    s.dx = 0;
    s.vel = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.swiping = false;
    s.justSwiped = false;
    stripX.stop();
    hold();
  };

  const onPointerMove = (e) => {
    const s = dragState.current;
    if (!s.active) return;
    const dx = e.clientX - s.startX;
    if (!s.swiping && Math.abs(dx) > 8) s.swiping = true;
    if (!s.swiping) return;
    const now = performance.now();
    const dt = now - s.lastT;
    if (dt > 0) s.vel = (e.clientX - s.lastX) / dt;
    s.lastX = e.clientX;
    s.lastT = now;
    s.dx = dx;
    stripX.set(targetX + dx);
    e.preventDefault();
  };

  const onPointerUp = () => {
    const s = dragState.current;
    if (!s.active) return;
    s.active = false;
    s.justSwiped = s.swiping;
    if (s.swiping) {
      if (Math.abs(s.dx) > 60 || Math.abs(s.vel) > 0.6) {
        const dir = s.dx > 0 || s.vel > 0 ? -1 : 1;
        go(dir);
        return;
      }
    }
    animate(stripX, targetX, { duration: 0.7, ease: easeInOut });
  };

  const onPointerCancel = () => {
    dragState.current.active = false;
    stripeBack();
  };

  const stripeBack = () => {
    if (stripRef.current) {
      dragState.current.swiping = false;
    }
    animate(stripX, targetX, { duration: 0.7, ease: easeInOut });
  };

  const onPreviewClick = (projectId) => {
    if (dragState.current.justSwiped) {
      dragState.current.justSwiped = false;
      return;
    }
    navTo(projectId);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  const nodes = [];
  for (let k = pos - 3; k <= pos + 3; k += 1) {
    nodes.push({ k, role: k - pos, project: FEATURED_PROJECTS[MOD(k)] });
  }

  return (
    <section className={styles.featured} onPointerLeave={onPointerCancel}>
      <div className={styles.container}>
        <SectionHeader
          kicker="Selected Work"
          title="Featured Projects"
          sub="A look at how we plan, produce and deliver flagship events across the Kingdom."
        />
      </div>

      <div
        className={styles.carouselViewport}
        ref={regionRef}
        style={{ height: width ? viewportH : undefined }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Featured projects carousel"
      >
        <motion.div className={styles.carouselStrip} ref={stripRef} style={{ x: stripX }}>
          {nodes.map(({ k, role, project }) => {
            const visible = role >= -1 && role <= 1;
            return (
              <motion.div
                key={k}
                className={styles.carouselSlide}
                style={{
                  width: slideW || undefined,
                  left: k * step,
                  zIndex: 3 - Math.abs(role),
                  pointerEvents: visible ? 'auto' : 'none',
                }}
                initial={false}
                animate={{ scale: role === 0 ? 1 : 0.86, opacity: visible ? 1 : 0 }}
                transition={{
                  scale: { duration: 0.8, ease: easeInOut },
                  opacity: { duration: 0.5, ease: 'easeOut' },
                }}
                onClick={role !== 0 ? () => onPreviewClick(project.id) : undefined}
                aria-hidden={role !== 0}
              >
                <div className={styles.carouselMedia}>
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    fill
                    sizes="(max-width: 680px) 92vw, (max-width: 1180px) 72vw, 74vw"
                    className={styles.carouselImage}
                    priority={k === 0}
                    loading={k === 0 ? undefined : 'lazy'}
                  />
                  {role !== 0 && (
                    <div className={styles.carouselShade}>
                      <span className={styles.carouselPreviewTitle}>{project.title}</span>
                    </div>
                  )}
                  {role === 0 && (
                    <AnimatePresence mode="wait">
                      {!open && (
                        <motion.button
                          type="button"
                          layoutId="vd-control"
                          exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                          className={styles.carouselViewDetails}
                          onClick={() => { setPaused(true); clearTimeout(pauseTimer.current); setOpen(true); }}
                          aria-label={`View details — ${project.title}`}
                        >
                          <motion.span layoutId="vd-line" className={styles.vdLine} aria-hidden="true" />
                          View Details
                          <motion.span
                            className={styles.vdArrow}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.45, ease: easeInOut }}
                          >
                            <ChevronDown size={16} strokeWidth={2} />
                          </motion.span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  )}
                </div>

                {role === 0 && (
                  <motion.div className={styles.carouselContent} layout>
                    <motion.span variants={lineItem} className={styles.carouselContentLine} aria-hidden="true" />
                    <motion.span variants={textItem} className={styles.carouselCategory}>
                      {project.category}
                    </motion.span>
                    <motion.h3 variants={textItem} className={styles.carouselTitle}>
                      {project.title}
                    </motion.h3>
                    <motion.div variants={textItem} className={styles.carouselMeta}>
                      <span className={styles.carouselMetaItem}>
                        <Building2 size={15} strokeWidth={1.75} />
                        {project.client}
                      </span>
                      <span className={styles.carouselMetaItem}>
                        <MapPin size={15} strokeWidth={1.75} />
                        {project.location}
                      </span>
                    </motion.div>
                    <motion.div variants={textItem} className={styles.carouselScope}>
                      {project.scope.map((s) => (
                        <span key={s} className={styles.carouselScopeItem}>
                          {s}
                        </span>
                      ))}
                    </motion.div>
                    <motion.div variants={textItem}>
                      <Link href="/projects" className={styles.featuredLink}>
                        View Case Study <ArrowRight size={16} strokeWidth={1.75} />
                      </Link>
                    </motion.div>
                  </motion.div>
                )}

                {role === 0 && (
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        className={styles.carouselPanel}
                        initial={{ top: '100%', opacity: 0 }}
                        animate={{ top: '0%', opacity: 1 }}
                        exit={{ top: '100%', opacity: 0 }}
                        transition={{ duration: 0.7, ease: easeInOut }}
                      >
                        <motion.div className={styles.carouselPanelInner} variants={panelRows} initial="hidden" animate="show">
                          <motion.div className={styles.carouselPanelHead} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
                            <motion.div variants={rowLine} className={styles.carouselPanelHeadLeft}>
                              <span className={styles.carouselPanelLabel}>Project Detail</span>
                            </motion.div>
                            <motion.button
                              type="button"
                              layoutId="vd-control"
                              variants={rowIcon}
                              className={styles.carouselPanelClose}
                              onClick={() => setOpen(false)}
                              aria-label="Close project details"
                            >
                              Close
                              <X size={14} strokeWidth={2} />
                            </motion.button>
                          </motion.div>

                          {project.details.map((d) => (
                            <motion.div key={d.label} className={styles.panelRow} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
                              <motion.span variants={rowLine} className={styles.panelRowLine} aria-hidden="true" />
                              <div className={styles.panelRowMain}>
                                <motion.span variants={rowIcon} className={styles.panelRowIcon}>
                                  <d.icon size={16} strokeWidth={1.75} />
                                </motion.span>
                                <div className={styles.panelRowText}>
                                  <motion.h4 variants={rowHead} className={styles.panelRowHead}>
                                    {d.label}
                                  </motion.h4>
                                  <motion.p variants={rowBody} className={styles.panelRowBody}>
                                    {d.body}
                                  </motion.p>
                                  {d.items && (
                                    <motion.ul variants={rowBody} className={styles.panelRowList}>
                                      {d.items.map((it) => (
                                        <li key={it}>{it}</li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className={styles.container}>
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => go(-1)}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <div className={styles.carouselDots} role="tablist" aria-label="Projects">
            {FEATURED_PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={p.title}
                className={`${styles.carouselDot}${active === i ? ` ${styles.carouselDotActive}` : ''}`}
                onClick={() => navTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => go(1)}
            aria-label="Next project"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}