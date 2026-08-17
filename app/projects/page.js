'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, ChevronDown, ChevronUp, MapPin, Tag } from 'lucide-react';
import { realProjects } from '@/data/realProjects';
import { FEATURED_PROJECTS } from '@/components/creativeWorks/FeaturedCarousel';

const EASE = [0.22, 1, 0.36, 1];

const cardMotion = {
  hidden: { opacity: 0, y: 90, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: Math.min(i, 10) * 0.09 },
  }),
  exit: { opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.3 } },
};

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const textItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

const caseContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const caseStep = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const caseLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

const DIVISIONS = ['Automation', 'Fabrication', 'Installation', 'Maintenance', 'Creative'];

const creativeItems = FEATURED_PROJECTS.map((p) => ({
  ...p,
  id: `c${p.id}`,
  division: 'Creative',
}));

const ALL_ITEMS = [...realProjects, ...creativeItems];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [prevFilter, setPrevFilter] = useState(filter);
  if (prevFilter !== filter) {
    setPrevFilter(filter);
    setExpanded(null);
  }
  const filtered = filter === 'all' ? ALL_ITEMS : ALL_ITEMS.filter(p => p.division === filter);

  return (
    <div className="about-theme">
      <style>{`
        .pp-card, .pp-row {
          background: #1A1C23;
          border: 1px solid #1F2937;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
          min-width: 0;
        }

        .pp-card-inner {
          display: grid;
          grid-template-columns: 350px 1fr;
          align-items: stretch;
        }

        .pp-cover {
          position: relative;
          overflow: hidden;
          min-height: 250px;
        }

        .pp-cover-zoom {
          position: absolute;
          inset: 0;
        }

        .pp-cover-zoom img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transform: scale(1);
          transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .pp-card.is-open .pp-cover-zoom img {
          transform: scale(1.03);
        }

        .pp-cover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(15,15,20,0) 60%, rgba(22,24,31,0.85) 100%);
          pointer-events: none;
        }

        .pp-body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 14px;
          min-width: 0;
        }

        .pp-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pp-title {
          font-size: 1.55rem;
          font-weight: 800;
          letter-spacing: -0.3px;
          line-height: 1.25;
          color: #FFFFFF;
          margin: 0;
          min-width: 0;
          overflow-wrap: break-word;
        }

        .pp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          align-items: center;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.66);
          font-weight: 500;
          min-width: 0;
        }

        .pp-meta span { min-width: 0; overflow-wrap: break-word; }

        .pp-meta svg { color: #E8A73B; vertical-align: -3px; margin-right: 6px; }

        .pp-view {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #E8A73B;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: inherit;
        }

        .pp-view svg { transition: transform 0.35s ease; }

        .pp-case {
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .pp-case-inner {
          padding: 30px 32px 36px;
          max-width: 860px;
        }

        .pp-case-line {
          width: 34px;
          height: 2px;
          background: #E8A73B;
          transform-origin: left;
          margin-bottom: 22px;
        }

        .pp-case-head {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #E8A73B;
          margin: 0 0 12px;
        }

        .pp-case-text {
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.82);
          margin: 0;
          max-width: 720px;
          min-width: 0;
          overflow-wrap: break-word;
        }
        }

        .pp-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .pp-chip {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.78);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 6px 14px;
        }

        .pp-list {
          list-style: none;
          margin: 10px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pp-list li {
          position: relative;
          padding-left: 18px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.82);
        }
        .pp-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #E8A73B;
        }

        .pp-row-inner {
          display: grid;
          grid-template-columns: 260px 1fr;
          align-items: stretch;
        }

        .pp-row .pp-cover { min-height: 250px; }
        .pp-row .pp-cover::after { background: none; }

        @media (max-width: 820px) {
          .pp-card-inner { grid-template-columns: 1fr; }
          .pp-row-inner { grid-template-columns: 1fr; }
          .pp-cover { min-height: 250px; }
          .pp-cover::after { background: none; }
          .pp-body { padding: 26px 22px 24px; }
          .pp-case-inner { padding: 24px 22px 30px; }
        }
      `}</style>

      <section className="pillar-hero" style={{ background: 'linear-gradient(135deg, var(--bg) 0%, var(--bg-alt) 100%)' }}>
        <div className="container pillar-hero-content">
          <motion.h1
            className="hero-title"
            style={{ fontSize: '3rem' }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >Our <span className="gradient-text">Project Portfolio</span></motion.h1>
          <motion.p
            className="hero-subtitle"
            style={{ maxWidth: 700 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >Real-world proof of capability across automation, fabrication, installation, maintenance, and creative works.</motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-track">
            <button key="all" className={'filter-btn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>
              {filter === 'all' && (
                <motion.div layoutId="activeFilterPill" className="filter-pill" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
              )}
              <span className="filter-label">All</span>
            </button>
            {DIVISIONS.map(c => (
              <button key={c} className={'filter-btn' + (filter === c ? ' active' : '')} onClick={() => setFilter(c)}>
                {filter === c && (
                  <motion.div layoutId="activeFilterPill" className="filter-pill" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                )}
                <span className="filter-label">{c}</span>
              </button>
            ))}
          </div>

          <motion.div
            className="pp-list-wrap"
            style={{ display: 'grid', gap: 24 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, i) => {
                const isOpen = expanded === p.id;
                const isCreative = p.division === 'Creative';
                return (
                  <motion.div
                    key={p.id}
                    layout
                    variants={cardMotion}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    exit="exit"
                  >
                    <article className={`${isCreative ? 'pp-row' : 'pp-card'}${isOpen ? ' is-open' : ''}`}>
                    <div className={isCreative ? 'pp-row-inner' : 'pp-card-inner'}>
                      <div className="pp-cover">
                        <motion.div
                          className="pp-cover-zoom"
                          variants={{ hidden: { scale: 1.12 }, visible: { scale: 1, transition: { duration: 1.1, ease: EASE } } }}
                        >
                          <img src={p.image} alt={p.title} loading={i === 0 ? 'eager' : 'lazy'} />
                        </motion.div>
                      </div>
                      <motion.div className="pp-body" variants={textContainer}>
                        <motion.div variants={textItem} className="pp-tags">
                          {p.category && <span className="tag">{p.category}</span>}
                          {p.year && <span className="tag" style={{ background: 'none', border: '1px solid var(--border)' }}>{p.year}</span>}
                        </motion.div>
                        <motion.h3 variants={textItem} className="pp-title">{p.title}</motion.h3>
                        <motion.div variants={textItem} className="pp-meta">
                          {p.client && <span><Building2 size={14} strokeWidth={1.75} />{p.client}</span>}
                          {p.location && <span><MapPin size={14} strokeWidth={1.75} />{p.location}</span>}
                        </motion.div>
                        {isCreative && p.scope && p.scope.length > 0 && (
                          <motion.div variants={textItem} className="pp-chips" style={{ marginTop: 0 }}>
                            {p.scope.map(s => <span key={s} className="pp-chip"><Tag size={10} style={{ verticalAlign: -1, marginRight: 5 }} />{s}</span>)}
                          </motion.div>
                        )}
                        <motion.button variants={textItem} className="pp-view" onClick={() => setExpanded(isOpen ? null : p.id)} aria-expanded={isOpen}>
                          {isOpen ? 'Show Less' : 'View Details'}
                          {isOpen ? <ChevronUp size={15} strokeWidth={2} /> : <ChevronDown size={15} strokeWidth={2} />}
                        </motion.button>
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="pp-case"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.7, ease: EASE }}
                        >
                          <motion.div className="pp-case-inner" variants={caseContainer} initial="hidden" animate="show">
                            {isCreative ? (
                              p.details.map((d) => (
                                <div key={d.label}>
                                  <motion.span variants={caseLine} className="pp-case-line" aria-hidden="true" style={{ marginBottom: 14, display: 'block' }} />
                                  <motion.h4 variants={caseStep} className="pp-case-head">{d.label}</motion.h4>
                                  {d.items ? (
                                    <motion.ul variants={caseStep} className="pp-list">
                                      {d.items.map(item => <li key={item}>{item}</li>)}
                                    </motion.ul>
                                  ) : (
                                    <motion.p variants={caseStep} className="pp-case-text" style={{ marginBottom: 18 }}>{d.body}</motion.p>
                                  )}
                                </div>
                              ))
                            ) : (
                              <>
                                <motion.span variants={caseLine} className="pp-case-line" aria-hidden="true" />
                                <motion.h4 variants={caseStep} className="pp-case-head">Overview</motion.h4>
                                <motion.p variants={caseStep} className="pp-case-text">{p.overview}</motion.p>

                                {p.services && p.services.length > 0 && (
                                  <>
                                    <motion.h4 variants={caseStep} className="pp-case-head" style={{ marginTop: 26 }}>Services Delivered</motion.h4>
                                    <motion.div variants={caseStep} className="pp-chips">
                                      {p.services.map(s => <span key={s} className="pp-chip">{s}</span>)}
                                    </motion.div>
                                  </>
                                )}

                                {p.deliverables && p.deliverables.length > 0 && (
                                  <>
                                    <motion.h4 variants={caseStep} className="pp-case-head" style={{ marginTop: 26 }}>Deliverables</motion.h4>
                                    <motion.ul variants={caseStep} className="pp-list">
                                      {p.deliverables.map(d => <li key={d}>{d}</li>)}
                                    </motion.ul>
                                  </>
                                )}
                              </>
                            )}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '0 0 40px' }}>
        <div className="container">
          <Link href="/downloads" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            Request Detailed Case Studies <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Want to See More <span className="gradient-text">Case Studies?</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>Contact us for detailed case studies relevant to your industry.</p>
          <Link href="/downloads" className="btn btn-primary btn-lg">Download Case Studies <i className="fas fa-arrow-right" /></Link>
        </div>
      </section>
    </div>
  );
}