'use client';
import { motion } from 'framer-motion';
import styles from './creative.module.css';

export default function Divider() {
  return (
    <div className={styles.divider}>
      <span className={styles.dividerLine}>
        <motion.span
          className={styles.dividerAccent}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </span>
      <span className={styles.dividerDot} />
      <span className={styles.dividerLine}>
        <motion.span
          className={styles.dividerAccent}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          style={{ transformOrigin: 'right' }}
        />
      </span>
    </div>
  );
}