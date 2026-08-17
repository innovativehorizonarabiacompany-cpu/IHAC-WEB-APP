'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import styles from './creative.module.css';

const services = [
  {
    title: 'POSM Materials',
    desc: 'Counter units, dump bins, wobblers, and shelf talkers engineered for maximum in-store pull.',
  },
  {
    title: 'Retail Displays & Fixtures',
    desc: 'Custom shelving, stands, and showcases that turn floor space into brand territory.',
  },
  {
    title: 'Signage & Wayfinding',
    desc: 'Interior, exterior, and digital signage with permitting and installation handled end-to-end.',
  },
  {
    title: 'Packaging Design & Production',
    desc: 'Structural and graphic packaging that protects the product and sells the story.',
  },
  {
    title: 'Exhibition Stands & Booths',
    desc: 'Modular and bespoke stands, from 9 sqm booths to flagship pavilions.',
  },
  {
    title: 'Print & Large Format',
    desc: 'Banners, backdrops, and vehicle wraps produced on industrial-grade equipment.',
  },
];

export default function ServiceGrid() {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <SectionHeader
          kicker="Capabilities"
          title="Services Built for Retail & Events"
          sub="Every discipline is delivered in-house — one accountable team from artwork to installation."
        />
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className={styles.serviceCard}>
                <h3 className={styles.serviceName}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <Link href="/contact" className={styles.serviceLink}>
                  Enquire <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
