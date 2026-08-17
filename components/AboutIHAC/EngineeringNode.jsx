'use client';
import { motion } from 'framer-motion';
import HexagonIcon from './HexagonIcon';
import styles from './AboutIHAC.module.css';

function Words({ text }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={`${w}-${i}`} className={styles.maskWord}>
          <span className={styles.word} style={{ display: 'inline-block' }}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

export default function EngineeringNode({ module, index, isHovered, onHover, onLeave }) {
  return (
    <article
      className={`${styles.node}${isHovered ? ` ${styles.nodeHovered}` : ''}`}
      style={{ '--accent': module.color }}
      data-module={module.id}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.numberRow}>
        <span className={styles.tick} aria-hidden="true" />
        <span className={styles.number}>{module.number}</span>
        <span className={styles.tick} aria-hidden="true" />
      </div>

      <motion.div
        className={styles.hexWrap}
        animate={{ y: [0, -2, 0], scale: [1, 1.006, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.7 }}
        whileHover={{ y: -6, scale: 1.03 }}
      >
        <div className={styles.glow} aria-hidden="true" />
        <HexagonIcon module={module} />
      </motion.div>

      <h3 className={styles.title}>{module.title}</h3>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          {module.bullets ? (
            <ul className={styles.checklist}>
              {module.bullets.map((b) => (
                <li key={b} className={styles.checkRow}>
                  <svg className={styles.hexTick} viewBox="0 0 12 12" aria-hidden="true">
                    <polygon points="6,1 11,3.5 11,8.5 6,11 1,8.5 1,3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <span className={styles.checkLabel}>{b}</span>
                  <span className={styles.checkDivider} aria-hidden="true" />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.desc}>
              <Words text={module.description} />
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
