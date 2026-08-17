'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConclusionCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ith-fab-conclusion" ref={ref}>
      <p className="ith-fab-conclusion-line">Whatever the scope — a tank, a structure, a full site — the same precision applies.</p>
      <Link href="/contact" className="ith-fab-cta ith-fab-cta--lg">
        Start your fabrication project <ArrowRight size={16} strokeWidth={1.75} />
      </Link>
    </div>
  );
}
