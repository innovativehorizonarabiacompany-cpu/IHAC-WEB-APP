'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import styles from './creative.module.css';

export default function FinalCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <Reveal>
          <span className={styles.kicker} style={{ justifyContent: 'center' }}>
            <svg width="28" height="2" viewBox="0 0 28 2" fill="none" aria-hidden="true">
              <path d="M0 1 H28" stroke="#C88A1A" strokeWidth="2" />
            </svg>
            Let&apos;s Create
          </span>
          <h2 className={styles.ctaTitle}>
            Your Next Brand Moment <br />
            <span className={styles.ctaTitleAccent}>Starts Here</span>
          </h2>
          <p className={styles.ctaSub}>
            Tell us about your campaign, launch, or event — our creative team will come back
            with a concept and a plan within 48 hours.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={`${styles.btn} ${styles.btnAccent}`}>
              Start a Project <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
            <Link href="/projects" className={`${styles.btn} ${styles.btnLine}`}>
              See Our Portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}