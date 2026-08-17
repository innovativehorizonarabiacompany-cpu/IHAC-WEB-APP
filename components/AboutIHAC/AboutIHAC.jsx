'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EngineeringNode from './EngineeringNode';
import EngineeringConnections from './EngineeringConnections';
import { runPowerOn, setFinalState } from './animations';
import { HERO, MODULES } from './aboutData';
import styles from './AboutIHAC.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIHAC() {
  const sectionRef = useRef(null);
  const powerOnFired = useRef(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let cleanupFn = null;

    // Defer one frame so the DOM is stable after hydration.
    const raf = requestAnimationFrame(() => {
      const heroEl = sectionEl.querySelector('header');
      if (!heroEl || !heroEl.children.length) return;

      const ctx = gsap.context(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduceMotion) {
          const headingEl = heroEl.querySelector(`.${styles.heading}`);
          const maskInners = heroEl.querySelectorAll(`.${styles.maskInner}`);

          gsap.fromTo(
            headingEl,
            { y: 26, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 75%',
                once: true,
              },
            }
          );

          gsap.fromTo(
            maskInners,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.028,
              ease: 'power3.out',
              delay: 0.4,
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 75%',
                once: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top 68%',
          once: true,
          onEnter: () => {
            if (powerOnFired.current) return;
            powerOnFired.current = true;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              setFinalState(sectionEl, styles);
            } else {
              runPowerOn(sectionEl, styles);
            }
          },
        });
      }, sectionEl);

      cleanupFn = () => ctx.revert();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="about-ihac-heading">
      <div className={styles.wrap}>
        <header className={styles.hero}>
          <h2 id="about-ihac-heading" className={styles.heading}>
            {HERO.headingBefore} <span className={styles.accent}>{HERO.headingAccent}</span>
          </h2>
          <p className={styles.paragraph}>
            {HERO.paragraph.split(' ').map((w, i) => (
              <span key={`${w}-${i}`} className={styles.maskWord}>
                <span className={styles.maskInner}>{w}&nbsp;</span>
              </span>
            ))}
          </p>
        </header>

        <div className={styles.stage}>
          <EngineeringConnections />
          <div className={styles.grid}>
            {MODULES.map((m, i) => (
              <EngineeringNode
                key={m.id}
                module={m}
                index={i}
                isHovered={hovered === i}
                onHover={() => setHovered(i)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
