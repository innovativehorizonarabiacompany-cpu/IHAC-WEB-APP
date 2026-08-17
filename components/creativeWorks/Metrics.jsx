'use client';
import Reveal from './Reveal';
import CountUp from './CountUp';
import styles from './creative.module.css';

const metrics = [
  { value: 250, suffix: '+', label: 'Events & Activations' },
  { value: 40, suffix: '+', label: 'Exhibition Stands Built' },
  { value: 500, suffix: 'K+', label: 'Sqm of Venue Space Produced' },
  { value: 100, suffix: '+', label: 'Brand Partners Served' },
];

export default function Metrics() {
  return (
    <section className={styles.metrics}>
      <div className={styles.container}>
        <div className={styles.metricsGrid}>
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={styles.metricValue}>
                <CountUp value={m.value} />
                <span className={styles.metricSuffix}>{m.suffix}</span>
              </div>
              <div className={styles.metricLabel}>{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}