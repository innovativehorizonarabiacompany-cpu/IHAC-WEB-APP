'use client';
import { memo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { trustTestimonials, capabilityDetails } from '@/data/siteData';
import RadialWheel from './RadialWheel';

const ACCENT = '#E8A73B';
const AUTOPLAY_DELAY = 6000;
const RESUME_DELAY = 3000;

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < rating ? '#f59e0b' : '#e0e0e0', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );
}

const TestimonialCard = memo(function TestimonialCard({ item }) {
  return (
    <div>
      <Stars rating={item.rating} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <span style={{ color: ACCENT, fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>❝</span>
        <p style={{
          fontSize: '1.1rem', lineHeight: 1.7, color: '#1a1a2e',
          fontWeight: 400, fontStyle: 'italic', margin: 0,
        }}>
          {item.text}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: ACCENT, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '0.85rem',
        }}>
          {item.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a2e' }}>{item.name}</div>
          <div style={{ fontWeight: 400, fontSize: '0.82rem', color: '#888' }}>{item.role}, {item.company}</div>
        </div>
      </div>
    </div>
  );
});

function PaginationDots({ count, active, onDotClick }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          style={{
            width: active === i ? 28 : 8, height: 8, borderRadius: 4,
            border: 'none', background: active === i ? ACCENT : '#d0d0d0',
            cursor: 'pointer', transition: 'all 0.4s ease', padding: 0,
          }}
        />
      ))}
    </div>
  );
}

const CapabilityInfoCard = memo(function CapabilityInfoCard({ detail, reduced }) {
  const fadeTransition = { duration: reduced ? 0.01 : 0.5, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <div className="trust-cap-card">
      <AnimatePresence mode="wait">
        <motion.div
          key={detail.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={fadeTransition}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <i className={`fas fa-${detail.icon}`} style={{ color: ACCENT, fontSize: '1.2rem', width: 24 }} />
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e' }}>{detail.label}</h4>
          </div>

          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#555', marginBottom: detail.items.length || detail.tags.length ? 10 : 0 }}>
            {detail.description}
          </p>

          {detail.items.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 8 }}>
              {detail.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: '0.85rem', color: '#555' }}>
                  <span style={{ color: ACCENT, fontSize: '0.65rem' }}>●</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {detail.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
              {detail.tags.map((tag, i) => (
                <span
                  key={i}
                  className="trust-skill-tag"
                  style={{
                    background: '#fff', color: '#1a2a3a', padding: '4px 12px',
                    borderRadius: 50, fontSize: '0.78rem', fontWeight: 500,
                    border: '1px solid #e0e0e0', transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default function TrustSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const autoplayRef = useRef(null);
  const connectorRef = useRef(null);

  const handleBubbleLeave = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  const handleDotClick = useCallback((index) => {
    setIsPaused(true);
    setActiveIndex(index);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  const handleWheelHover = useCallback((index) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    setIsPaused(true);
  }, []);

  const handleWheelClick = useCallback((index) => {
    setIsPaused(true);
    setActiveIndex(index);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % trustTestimonials.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const current = trustTestimonials[activeIndex];
  const currentDetail = capabilityDetails[activeIndex];

  return (
    <section ref={sectionRef} className="ab-section ab-section-alt trust-section">
      <div className="ab-container">
        <h2 className="ab-section-title">
          Why Clients Trust <span style={{ color: ACCENT }}>IHAC</span>
        </h2>
        <p className="ab-section-sub">
          Real feedback from the teams we work with every day.
        </p>

        <div className="trust-layout">
          <div className="trust-left">
            <div className="trust-card">
              <div style={{ position: 'relative' }}>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <TestimonialCard item={current} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <PaginationDots count={trustTestimonials.length} active={activeIndex} onDotClick={handleDotClick} />
            </div>
            <CapabilityInfoCard detail={currentDetail} reduced={shouldReduceMotion} />
          </div>

          <div className="trust-right">
            <RadialWheel
              capabilities={capabilityDetails}
              activeIndex={activeIndex}
              onSliceClick={handleWheelClick}
              onSliceHover={handleWheelHover}
              onSliceLeave={handleBubbleLeave}
              reducedMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
