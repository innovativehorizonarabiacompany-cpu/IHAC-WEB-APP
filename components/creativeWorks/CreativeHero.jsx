'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './creative.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const tiles = [
  { src: '/images/event_management/high_profile_guests.png', cls: styles.collageA, alt: 'High-profile guests at an IHAC corporate event' },
  { src: '/images/event_management/interior_shot_with_guest.png', cls: styles.collageB, alt: 'Interior of a produced event venue with guest' },
  { src: '/images/event_management/event_exterior.png', cls: styles.collageD, alt: 'Event venue exterior' },
  { src: '/images/event_management/venue_arrangement_shot_2.png', cls: styles.collageE, alt: 'Arranged venue seating' },
];

const words = ['Strategy', 'Design', 'Production', 'Delivery'];

export default function CreativeHero() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className={styles.heroKickerRow}>
            <span className={styles.heroLine} />
            <span className={styles.heroKicker}>Creative Works</span>
          </motion.div>

          <motion.h1 variants={item} className={styles.heroTitle}>
            Crafting Experiences That Speak for{' '}
            <span className={styles.heroTitleAccent}>Your Brand</span>
          </motion.h1>

          <motion.p variants={item} className={styles.heroSub}>
            From point-of-sale materials and signage to exhibitions and full-scale events —
            we design, fabricate, and deliver brand moments across Saudi Arabia, the GCC,
            and beyond.
          </motion.p>

          <motion.div variants={item} className={styles.heroActions}>
            <Link href="#what-we-create" className={`${styles.btn} ${styles.btnInk}`}>
              Explore Our Work <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
            <Link href="/contact" className={`${styles.btn} ${styles.btnLine}`}>
              Book a Consultation
            </Link>
          </motion.div>

          {reduce ? (
            <div className={styles.strategy}>
              <span className={styles.strategyStatic}>Strategy · Design · Production · Delivery</span>
            </div>
          ) : (
            <motion.div variants={item} className={styles.strategy}>
              <svg
                className={styles.strategyLine}
                viewBox="0 0 480 2"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M0 1 H480"
                  stroke="#C88A1A"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.0, ease: 'easeInOut' }}
                />
              </svg>
              <div className={styles.strategyWords}>
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    className={styles.strategyWord}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 1.0 + 0.34 * (i + 1), ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
              <motion.span
                className={styles.strategyUnder}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className={styles.collage}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {tiles.map((t, i) => (
            <div key={i} className={`${styles.collageTile} ${t.cls}`}>
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                priority={i === 0}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className={`${styles.container} ${styles.heroScroll}`}>
        <span className={styles.heroScrollText}>Scroll</span>
        <motion.span
          className={styles.heroScrollLine}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}