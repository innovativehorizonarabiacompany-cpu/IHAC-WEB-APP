'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, direction = 'up', className }) {
  const reduce = useReducedMotion();
  const hidden = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? 24 : 0,
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
      };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
