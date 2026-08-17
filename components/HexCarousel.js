'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HexServiceNetwork from '@/components/HexServiceNetwork';
import HexContentPanel from '@/components/HexContentPanel';
import { resolveDivisionImage } from '@/components/hexImageSource';
import { divisions } from '@/data/siteData';

const hexDivisions = divisions.filter((d) => d.hex !== false);

export default function HexCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const autoTimerRef = useRef(null);

  const currentDivision = hexDivisions[activeIndex];

  const resetAutoRotation = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % hexDivisions.length);
    }, 3000);
  }, []);

  useEffect(() => {
    resetAutoRotation();
    return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
  }, [resetAutoRotation]);

  useEffect(() => {
    const n = hexDivisions.length;
    if (!n) return;
    [(activeIndex + 1) % n, (activeIndex - 1 + n) % n].forEach((idx) => {
      const src = resolveDivisionImage(hexDivisions[idx], idx);
      if (!src) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      setTimeout(() => link.remove(), 4000);
    });
  }, [activeIndex]);

  return (
    <section className="section hex-bg hex-section-wrap">
      <div className="hex-container-wide">
        <div className="hex-section-header">
          <h2 className="hex-heading">
            Comprehensive <span style={{ color: '#E8A73B' }}>Industrial</span> Services
          </h2>
        </div>

        <div className="hex-three-col">
          <div className="hex-col-left">
            <HexServiceNetwork
              divisions={hexDivisions}
              activeIndex={activeIndex}
              onSelect={(idx) => {
                setActiveIndex(idx);
                resetAutoRotation();
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <HexContentPanel
              key={activeIndex}
              division={currentDivision}
              index={activeIndex}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
