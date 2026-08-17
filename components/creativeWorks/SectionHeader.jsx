'use client';
import { motion } from 'framer-motion';
import styles from './creative.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const line = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.7, ease: 'easeInOut' } },
};

const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SectionHeader({ kicker, title, sub, align = 'center' }) {
  return (
    <motion.div
      className={align === 'left' ? styles.headerLeft : styles.header}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {kicker && (
        <motion.span variants={up} className={styles.kicker}>
          <svg width="28" height="2" viewBox="0 0 28 2" fill="none" aria-hidden="true">
            <motion.path d="M0 1 H28" stroke="#C88A1A" strokeWidth="2" variants={line} />
          </svg>
          {kicker}
        </motion.span>
      )}
      <motion.h2 variants={up} className={styles.h2}>{title}</motion.h2>
      {sub && <motion.p variants={up} className={styles.sub}>{sub}</motion.p>}
    </motion.div>
  );
}