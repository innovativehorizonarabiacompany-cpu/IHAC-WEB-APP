'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import styles from './SectorSection.module.css';

export default function SectorCard({ data, index, total, onPrev, onNext }) {
  const bulletRefs = useRef([]);

  useEffect(() => {
    const targets = bulletRefs.current.filter(Boolean);
    anime.remove(targets);
    anime({
      targets,
      translateX: [-10, 0],
      opacity: [0, 1],
      duration: 400,
      delay: anime.stagger(70, { start: 150 }),
      easing: 'easeOutQuad',
      clearProps: 'transform',
    });
  }, [index]);

  return (
    <div className={styles.card}>
      <div className={styles.cardBadge}>
        <motion.span
          key={`b-${index}`}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      <h3 className={styles.cardTitle}>
        <motion.span
          key={`t-${index}`}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {data.name}
        </motion.span>
      </h3>

      <p className={styles.desc}>
        <motion.span
          key={`d-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
        >
          {data.description}
        </motion.span>
      </p>

      <ul className={styles.bullets}>
        {data.capabilities.map((cap, ci) => (
          <li
            key={`${index}-${ci}`}
            ref={(el) => { bulletRefs.current[ci] = el; }}
            className={styles.bullet}
            style={{ opacity: 0, transform: 'translateX(-10px)' }}
          >
            <span className={styles.dot} />
            <span>{cap}</span>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button onClick={onPrev} className={styles.arrow} aria-label="Previous industry">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <span className={styles.counter}>
          <span className={styles.counterCurrent}>{index + 1}</span>
          <span className={styles.counterDiv}>/</span>
          <span className={styles.counterTotal}>{total}</span>
        </span>
        <button onClick={onNext} className={styles.arrow} aria-label="Next industry">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
}
