'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Fingerprint, Printer, Layers, Megaphone } from 'lucide-react';
import Reveal from './Reveal';
import DrawIcon from './DrawIcon';
import SectionHeader from './SectionHeader';
import styles from './creative.module.css';

const cls = (...xs) => xs.filter(Boolean).join(' ');

const tiles = [
  {
    type: 'image',
    tag: 'POSM',
    name: 'Point-of-Sale Materials',
    desc: 'Counter units, dump bins, and shelf talkers engineered for in-store pull.',
    src: '/images/event_management/interior_shot_arrangment.png',
    alt: 'Arranged retail point-of-sale display',
  },
  {
    type: 'image',
    tag: 'Signage',
    name: 'Signage & Wayfinding',
    desc: 'Interior, exterior, and digital signage built for wayfinding and brand presence.',
    src: '/images/event_management/event_exterior_shot.png',
    alt: 'Exterior shot of a branded venue',
    wide: true,
  },
  {
    type: 'text',
    tag: 'Identity',
    name: 'Brand Identity Systems',
    desc: 'Scalable visual systems that remain consistent across every touchpoint.',
    icon: Fingerprint,
    tall: true,
  },
  {
    type: 'image',
    tag: 'Retail',
    name: 'Retail Displays & Fixtures',
    desc: 'Shelving, stands, and showcases that turn floor space into brand territory.',
    src: '/images/event_management/interior_shot_arrangment2.png',
    alt: 'Retail fixture arrangement',
  },
  {
    type: 'image',
    tag: 'Packaging',
    name: 'Packaging Design & Production',
    desc: 'Structural and graphic packaging that protects the product and sells the story.',
    src: '/images/event_management/cinematic_picture_of_table.png',
    alt: 'Cinematic product table setup',
  },
  {
    type: 'image',
    tag: 'Exhibitions',
    name: 'Exhibition Stands & Booths',
    desc: 'From 9 sqm booths to flagship pavilions — design, build, and logistics.',
    src: '/images/event_management/high_profile_guests_shot.png',
    alt: 'Guests at a produced exhibition stand',
  },
  {
    type: 'image',
    tag: 'Event Staging',
    name: 'Event Stage & Scenic Production',
    desc: 'Immersive stage environments designed for conferences, summits, and flagship experiences.',
    src: '/images/event_management/important_guests_speaking_on_stage.png',
    alt: 'Speakers on stage during an event',
  },
  {
    type: 'image',
    tag: 'Digital',
    name: 'Digital & Interactive',
    desc: 'Interactive experiences and screens that make campaigns tangible.',
    src: '/images/event_management/person_on_computer.png',
    alt: 'Digital production workstation',
    wide: true,
  },
  {
    type: 'text',
    tag: 'Print',
    name: 'Print & Large Format',
    desc: 'Banners, backdrops, and large-format graphics with gallery-grade finishing.',
    icon: Printer,
  },
  {
    type: 'text',
    tag: 'Corporate',
    name: 'Corporate Branding',
    desc: 'Uniforms, stationery, and office environments that carry your identity into daily operations.',
    icon: Layers,
  },
  {
    type: 'image',
    tag: 'Environments',
    name: 'Retail & Brand Environments',
    desc: 'Full retail and brand environments built to be experienced, not just seen.',
    src: '/images/event_management/venue_arrangement.png',
    alt: 'Branded venue environment',
    wide: true,
  },
  {
    type: 'text',
    tag: 'Campaigns',
    name: 'Campaign Execution',
    desc: 'End-to-end rollout of launch campaigns across retail, digital, and out-of-home.',
    icon: Megaphone,
  },
];

export default function WhatWeCreate() {
  return (
    <section id="what-we-create" className={`${styles.section} ${styles.wall}`}>
      <div className={styles.container}>
        <SectionHeader
          kicker="What We Create"
          title="A Full-Spectrum Creative Studio"
          sub="Twelve disciplines, one seamless pipeline — from first concept sketch to final on-site installation."
        />
        <div className={styles.studioGrid}>
          {tiles.map((t, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 0.08}
              className={cls(t.wide && styles.studioWide, t.tall && styles.studioTall)}
            >
              {t.type === 'image' ? (
                <Link
                  href="/contact"
                  className={styles.studioImg}
                  aria-label={`${t.name} — learn more`}
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes={t.wide ? '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'}
                  />
                  <span className={styles.studioCaption}>
                    <span className={styles.studioTag}>{t.tag}</span>
                    <span className={styles.studioName}>{t.name}</span>
                    <span className={styles.studioDesc}>{t.desc}</span>
                    <span className={styles.studioArrow}>
                      <ArrowRight size={15} strokeWidth={1.75} />
                    </span>
                  </span>
                </Link>
              ) : (
                <div className={styles.studioText}>
                  <div className={styles.studioIcon}>
                    <DrawIcon icon={t.icon} size={20} />
                  </div>
                  <div className={styles.studioBody}>
                    <span className={styles.studioTag}>{t.tag}</span>
                    <span className={styles.studioName}>{t.name}</span>
                    <p className={styles.studioDesc}>{t.desc}</p>
                    <Link href="/contact" className={styles.studioCta}>
                      Learn More <ArrowRight size={14} strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
