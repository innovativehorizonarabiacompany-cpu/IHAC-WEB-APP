'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { FileSearch, CalendarRange, DraftingCompass, Wrench, FlaskConical, Handshake } from 'lucide-react';
import styles from './MethodicalDelivery.module.css';

const STAGES = [
  { num: '01', title: 'Requirement Review', desc: 'Deep analysis of project needs, specifications, and constraints.', icon: FileSearch },
  { num: '02', title: 'Proposal & Planning', desc: 'Detailed scope, budget, timeline, and resource allocation.', icon: CalendarRange },
  { num: '03', title: 'Engineering & Design', desc: 'Technical design, drawings, and material specifications.', icon: DraftingCompass },
  { num: '04', title: 'Execution & Fabrication', desc: 'Professional execution with continuous quality monitoring.', icon: Wrench },
  { num: '05', title: 'Testing & Commissioning', desc: 'Rigorous FAT, SAT, and on-site commissioning.', icon: FlaskConical },
  { num: '06', title: 'Handover & Support', desc: 'Complete documentation, training, and ongoing support.', icon: Handshake },
];

export default function MethodicalDelivery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const eyebrow = section.querySelector(`.${styles.eyebrow}`);
    const title = section.querySelector(`.${styles.title}`);
    const sub = section.querySelector(`.${styles.sub}`);
    const cards = section.querySelectorAll(`.${styles.card}`);
    const icons = section.querySelectorAll(`.${styles.iconWrap}`);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [eyebrow, title, sub].forEach((el) => el && el.removeAttribute('style'));
      cards.forEach((el) => el.removeAttribute('style'));
      icons.forEach((el) => el.removeAttribute('style'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const tl = anime.timeline({ easing: 'easeOutExpo' });
          tl.add({ targets: eyebrow, opacity: [0, 1], translateY: [20, 0], duration: 550 })
            .add({ targets: title, opacity: [0, 1], translateY: [20, 0], duration: 650 }, '-=350')
            .add({ targets: sub, opacity: [0, 1], translateY: [20, 0], duration: 500 }, '-=300')
            .add({
              targets: cards,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              delay: anime.stagger(90),
              complete: () => {
                cards.forEach((c) => {
                  c.style.transform = '';
                  c.style.opacity = '';
                });
              },
            }, '-=400')
            .add({
              targets: icons,
              opacity: [0, 1],
              scale: [0.4, 1],
              rotate: [-14, 0],
              duration: 500,
              delay: anime.stagger(90, { start: 320 }),
              complete: () => {
                icons.forEach((el) => {
                  el.style.transform = '';
                  el.style.opacity = '';
                });
              },
            }, '-=480');
          obs.disconnect();
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <svg width="28" height="2" viewBox="0 0 28 2" fill="none" aria-hidden="true"><path d="M0 1 H28" stroke="#E8A73B" strokeWidth="2" /></svg>
            Methodical Delivery
          </span>
          <h2 className={styles.title} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            Methodical <span className={styles.accent}>Delivery</span>
          </h2>
          <p className={styles.sub} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            A proven end-to-end methodology from requirements analysis to post-handover support.
          </p>
        </div>
        <div className={styles.grid}>
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={s.num} className={styles.card} style={{ opacity: 0, transform: 'translateY(20px)' }}>
                <div className={styles.cardTop}>
                  <span className={styles.iconFloat} style={{ '--md-d': `${i * 0.4}s` }}>
                    <span className={styles.iconWrap} style={{ opacity: 0 }}>
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                  </span>
                  <span className={styles.num}>{s.num}</span>
                  <span className={styles.line} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
