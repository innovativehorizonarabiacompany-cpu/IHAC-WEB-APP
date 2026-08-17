'use client';
import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';

export default function DrawIcon({ icon: Icon, size = 22, strokeWidth = 1.75, className, drawDelay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const el = ref.current;
    if (reduce || !el) return;
    const paths = el.querySelectorAll('path');
    if (!paths.length) return;
    paths.forEach((p) => {
      p.setAttribute('pathLength', '1');
      p.style.strokeDasharray = '1';
      p.style.strokeDashoffset = '1';
    });
    animate(0, 1, {
      duration: 0.7,
      delay: drawDelay,
      ease: 'easeInOut',
      onUpdate: (v) => paths.forEach((p) => { p.style.strokeDashoffset = `${1 - v}`; }),
    });
  }, [inView, reduce, drawDelay]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: drawDelay }}
    >
      <Icon size={size} strokeWidth={strokeWidth} />
    </motion.span>
  );
}