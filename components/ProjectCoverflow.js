'use client';
import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';

const IMAGE_POOL = [
  'goodie.jpeg',
  'image-2%20copy.png','image-2.png','image-3.png','image-32.png',
  'WhatsApp%20Image%202025-12-31%20at%2017.24.20%20(1).jpg.jpeg',
  'WhatsApp%20Image%202025-12-31%20at%2017.24.21%20(1).jpg.jpeg',
  'WhatsApp%20Image%202025-12-31%20at%2017.24.23.jpg.jpeg',
  'WhatsApp%20Image%202025-12-31%20at%2017.24.44%20(1).jpg.jpeg',
  'WhatsApp%20Image%202026-04-05%20at%2018.48.34.jpg.jpeg',
  'WhatsApp%20Image%202026-04-05%20at%2018.48.46.jpg.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.37%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.37%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.38%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.38%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.38%20PM%20(3).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.38%20PM%20(4).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(10).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(3).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(4).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(5).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(6).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(7).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(8).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM%20(9).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.39%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(3).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(4).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(5).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(6).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(7).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(8).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM%20(9).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.40%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.41%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.41%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.06.41%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.14%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM%20(3).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM%20(4).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM%20(5).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM%20(6).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.15%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(10).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(11).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(3).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(4).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(5).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(6).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(7).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(8).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM%20(9).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.16%20PM.jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.17%20PM%20(1).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.17%20PM%20(2).jpeg',
  'WhatsApp%20Image%202026-07-24%20at%2012.11.17%20PM.jpeg',
];

function getImageUrl(name) {
  return `/images/Pictures/${name}`;
}

function circularDistance(index, activeIndex, total) {
  const diff = ((index - activeIndex) % total + total) % total;
  return diff > total / 2 ? diff - total : diff;
}

function getOffsets(w) {
  const near = Math.round(w * 0.22);
  const mid  = Math.round(w * 0.44);
  const far  = Math.round(w * 0.66);
  return { near, mid, far };
}

function computeCardStyle(pos, offsets) {
  const { near, mid, far } = offsets;
  switch (pos) {
    case 0:  return { scale: 1,    opacity: 1,   x: 0,     zIndex: 50 };
    case -1: return { scale: 0.85, opacity: 0.8, x: -near, zIndex: 40 };
    case 1:  return { scale: 0.85, opacity: 0.8, x: near,  zIndex: 40 };
    case -2: return { scale: 0.6,  opacity: 0.3, x: -mid,  zIndex: 30 };
    case 2:  return { scale: 0.6,  opacity: 0.3, x: mid,   zIndex: 30 };
    case -3: return { scale: 0.45, opacity: 0.1, x: -far,  zIndex: 20 };
    case 3:  return { scale: 0.45, opacity: 0.1, x: far,   zIndex: 20 };
    default: return { scale: 0.4,  opacity: 0,   x: pos < 0 ? -999 : 999, zIndex: 10 };
  }
}

function ProjectCoverflow({ initialProjects = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [winWidth, setWinWidth] = useState(1200);
  const containerRef = useRef(null);
  const ringAnimRef = useRef(null);

  const offsets = useMemo(() => getOffsets(winWidth), [winWidth]);

  const total = initialProjects.length;

  const deterministicMap = useMemo(() => {
    if (!total) return {};
    const map = {};
    for (let i = 0; i < total; i++) {
      map[i] = getImageUrl(IMAGE_POOL[i % IMAGE_POOL.length]);
    }
    return map;
  }, [total]);

  const imageFor = (index) => {
    const mapped = initialProjects[index]?.image;
    if (mapped) return mapped;
    return deterministicMap[index];
  };

  const [isDragging, setIsDragging] = useState(false);

  const rotateNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % total);
  }, [total]);

  const rotatePrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((i) => {
    setActiveIndex(i);
  }, []);

  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    if (info.offset.x < -50 || info.velocity.x < -500) {
      rotateNext();
    } else if (info.offset.x > 50 || info.velocity.x > 500) {
      rotatePrev();
    }
  }, [rotateNext, rotatePrev]);

  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handler = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  useEffect(() => {
    if (total < 2) return;
    if (isHovered || !isTabVisible || isDragging) return;
    const id = setInterval(rotateNext, 5000);
    return () => clearInterval(id);
  }, [total, isHovered, isTabVisible, isDragging, rotateNext]);

  useEffect(() => {
    if (!containerRef.current || total < 2) return;
    [
      (activeIndex + 1) % total,
      (activeIndex - 1 + total) % total,
    ].forEach((idx) => {
      const p = initialProjects[idx];
      if (!p) return;
      const src = p.image || deterministicMap[idx];
      if (!src) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      setTimeout(() => link.remove(), 4000);
    });
  }, [activeIndex, total, initialProjects, deterministicMap]);

  useEffect(() => {
    if (!containerRef.current || total < 2) return;
    const ring = containerRef.current.querySelector('.coverflow-timer-ring-svg circle');
    if (!ring) return;
    if (ringAnimRef.current) ringAnimRef.current.pause();
    const circumference = 2 * Math.PI * 50;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    ringAnimRef.current = anime({
      targets: ring,
      strokeDashoffset: [circumference, 0],
      duration: 5000,
      easing: 'linear',
      autoplay: true,
    });
    return () => { if (ringAnimRef.current) ringAnimRef.current.pause(); };
  }, [activeIndex, total]);

  if (total === 0) {
    return (
      <section className="section coverflow-section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <p className="coverflow-loading">Loading projects…</p>
        </div>
      </section>
    );
  }

  return (
    <div className="coverflow-root">
      <div
        ref={containerRef}
        className="coverflow-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {initialProjects.map((project, index) => {
          const pos = circularDistance(index, activeIndex, total);
          const style = computeCardStyle(pos, offsets);
          const isCenter = pos === 0;
          const hidden = Math.abs(pos) > 3;

          if (hidden) return null;

          return (
            <motion.div
                key={project.id}
                className={`coverflow-card-wrapper${isCenter ? ' active-card' : ''}`}
                initial={false}
                animate={isCenter
                  ? { x: style.x, scale: style.scale, opacity: style.opacity, zIndex: style.zIndex, y: [0, -3, 0] }
                  : { x: style.x, scale: style.scale, opacity: style.opacity, zIndex: style.zIndex, y: 0 }
                }
                transition={{
                  default: { type: 'spring', stiffness: 180, damping: 26, mass: 0.6 },
                  opacity: { type: 'spring', stiffness: 180, damping: 26, mass: 0.6 },
                  zIndex: { duration: 0 },
                  y: isCenter
                    ? { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                    : { type: 'spring', stiffness: 180, damping: 26, mass: 0.6 },
                }}
                whileHover={{ scale: 1.03, y: -4, boxShadow: '0px 20px 40px rgba(0,0,0,0.12)' }}
                onClick={() => { if (!isCenter) goTo(index); }}
                drag={isCenter ? 'x' : false}
                dragConstraints={isCenter ? { left: 0, right: 0 } : undefined}
                dragElastic={isCenter ? 0.2 : undefined}
                onDragStart={isCenter ? () => setIsDragging(true) : undefined}
                onDragEnd={isCenter ? handleDragEnd : undefined}
              >
                <div className={`coverflow-card${isCenter ? ' coverflow-card-active' : ''}`}>
                  <img
                    src={imageFor(index)}
                    alt={project.title}
                    className="coverflow-card-img"
                    loading="lazy"
                  />
                  <span className="coverflow-tag">{project.category}</span>
                  {isCenter && (
                    <svg className="coverflow-timer-ring-svg" viewBox="0 0 110 110" aria-hidden="true">
                      <circle cx="55" cy="55" r="50" fill="none" stroke="#EBE8E4" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-90 55 55)" />
                    </svg>
                  )}
                </div>
                <div className="coverflow-card-text">
                  <h3 className="coverflow-title">{project.title}</h3>
                  <p className="coverflow-meta">{project.category} · {project.year}</p>
                </div>
              </motion.div>
          );
        })}
      </div>

      <div className="coverflow-dots">
        {initialProjects.map((_, i) => (
          <button
            key={i}
            className={`coverflow-dot${i === activeIndex ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}

export default memo(ProjectCoverflow);
