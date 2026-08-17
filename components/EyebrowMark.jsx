'use client';
import { motion } from 'framer-motion';

const DRAW_EASE = [0.22, 1, 0.36, 1];

export default function EyebrowMark({ width = 56, play }) {
  const controlled = play !== undefined;

  return (
    <svg
      className="ith-eyebrow-mark"
      width={width}
      height="5"
      viewBox="0 0 56 5"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0 2.5 H48"
        stroke="#E8A73B"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        {...(controlled
          ? { animate: play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 } }
          : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } })}
        transition={{ duration: 0.7, ease: DRAW_EASE }}
      />
      <motion.circle
        cx="48"
        cy="2.5"
        r="2.5"
        fill="#E8A73B"
        initial={{ scale: 0, opacity: 0 }}
        {...(controlled
          ? { animate: play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 } }
          : { whileInView: { scale: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } })}
        transition={{ duration: 0.35, delay: 0.6, ease: 'easeOut' }}
      />
    </svg>
  );
}
