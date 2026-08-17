'use client';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import anime from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import { industriesData } from '@/data/siteData';
import SectorCard from './SectorCard';
import Infographic, {
  SECTOR_COUNT as COUNT,
  SECTOR_PALETTE as C,
  badgePos,
  CX,
  CY,
} from './Infographic';
import styles from './SectorSection.module.css';

const SECTOR_IMAGES = [
  'Oil & Gas.jpg',
  'petrochemcial.jpeg',
  'Water and Wastewater.jpg',
  'Manufacturing.png',
  'Comercial.jpeg',
  'Infrastructure.jpeg',
  'Warehouse.jpeg',
  'Food & Beverage.png',
  'Retail & Brand Environments.jpg',
];

const AUTOPLAY_MS = 4000;

export default function SectorSection() {
  const ringRef = useRef(null);
  const numberRef = useRef(null);
  const badgeGroupRef = useRef(null);
  const endpointRef = useRef(null);
  const segRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const ringDeg = useRef(0);

  const initBadge = useMemo(() => badgePos(0), []);

  // Autoplay carousel — advances the active industry on a loop.
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COUNT);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Anime.js transition on activeIndex change
  useEffect(() => {
    const idx = activeIndex;
    const rotNext = ringDeg.current + 6;

    // 1. Subtle ring rotation (+6° per transition)
    if (ringRef.current) {
      const obj = { r: ringDeg.current };
      anime({
        targets: obj,
        r: rotNext,
        duration: 450,
        easing: 'easeInOutQuad',
        update: () => {
          ringRef.current.setAttribute('transform', `rotate(${obj.r} ${CX} ${CY})`);
        },
      });
      ringDeg.current = rotNext;
    }

    // 2. Number count-up
    if (numberRef.current) {
      const obj = { v: idx + 1 };
      anime({
        targets: obj,
        v: idx + 1,
        duration: 500,
        easing: 'easeOutQuad',
        update: () => {
          numberRef.current.textContent = String(Math.round(obj.v)).padStart(2, '0');
        },
      });
    }

    // 3. Orbiting badge (spring)
    if (badgeGroupRef.current) {
      const p = badgePos(idx, rotNext);
      const obj = { x: initBadge.x, y: initBadge.y };
      anime({
        targets: obj,
        x: p.x,
        y: p.y,
        duration: 700,
        easing: 'spring(1, 80, 12, 0)',
        update: () => {
          badgeGroupRef.current.setAttribute('transform', `translate(${obj.x} ${obj.y})`);
        },
      });
    }

    // 4. Segment colors — active full saturation, inactive 18%
    segRefs.current.forEach((el, i) => {
      if (!el) return;
      anime({
        targets: el,
        stroke: i === idx ? C.yellow : C.inactive,
        duration: 350,
        easing: 'easeOutQuad',
      });
    });

    // 5. Endpoint circle scales in on the ring at the badge position
    if (endpointRef.current) {
      const p = badgePos(idx, rotNext);
      anime({
        targets: endpointRef.current,
        cy: p.y,
        r: [0, 3.5],
        opacity: [0, 1],
        duration: 500,
        delay: 150,
        easing: 'easeOutBack',
      });
    }
  }, [activeIndex]);

  const current = industriesData[activeIndex];
  const goPrev = () => { setActiveIndex(activeIndex > 0 ? activeIndex - 1 : COUNT - 1); startTimer(); };
  const goNext = () => { setActiveIndex((activeIndex + 1) % COUNT); startTimer(); };

  return (
    <section className={styles.section} style={{ background: C.bg }}>
      <div className={styles.pinned}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <h2 className={styles.title}>
              Sectors We <span className={styles.titleAccent}>Serve</span>
            </h2>
          </div>

          <div className={styles.layout}>
            <div className={styles.content}>
              <SectorCard
                data={current}
                index={activeIndex}
                total={COUNT}
                onPrev={goPrev}
                onNext={goNext}
              />
            </div>

            <div className={styles.visual}>
              <div className={styles.radial}>
                <div className={styles.silhouetteWrap}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndex}
                      src={current.silhouette}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className={styles.silhouette}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>
                </div>

                <motion.div
                  key={activeIndex}
                  className={styles.imageCard}
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div
                    className={styles.imageCardImg}
                    style={{
                      backgroundImage: `url(/images/${encodeURIComponent(SECTOR_IMAGES[activeIndex])})`,
                    }}
                  />
                </motion.div>

                <div className={styles.cardLine} aria-hidden="true">
                  <span className={styles.cardLineIndex}>
                    - {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <Infographic
                  activeIndex={activeIndex}
                  ringRef={ringRef}
                  segRefs={segRefs}
                  badgeGroupRef={badgeGroupRef}
                  numberRef={numberRef}
                  endpointRef={endpointRef}
                  initBadge={initBadge}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
