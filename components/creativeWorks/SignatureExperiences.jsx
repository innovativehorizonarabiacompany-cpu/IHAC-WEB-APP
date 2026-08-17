'use client';
import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import styles from './creative.module.css';

const experiences = [
  {
    type: 'image',
    tag: 'Corporate',
    title: 'Corporate Conferences',
    desc: 'Keynotes, summits, and town halls staged with broadcast-grade production.',
    src: '/images/event_management/person_conducting_presentation.png',
    alt: 'Speaker conducting a corporate presentation',
  },
  {
    type: 'image',
    tag: 'Exhibitions',
    title: 'Exhibition & Trade Shows',
    desc: 'Turnkey stands with design, fabrication, logistics, and on-site management.',
    src: '/images/event_management/exterior_setup_shot.png',
    alt: 'Exterior setup of a trade show venue',
  },
  {
    type: 'image',
    tag: 'Launches',
    title: 'Brand Launches',
    desc: 'Product reveals and launch events engineered for press and audience impact.',
    src: '/images/event_management/event_interior_high_profile.png',
    alt: 'High-profile interior brand launch',
  },
  {
    type: 'dark',
    tag: 'Celebrations',
    title: 'Gala Dinners & Awards',
    desc: 'Rigorous choreography, lighting, and catering coordination for landmark evenings.',
  },
  {
    type: 'light',
    tag: 'Culture',
    title: 'Cultural & Social Events',
    desc: 'Weddings, national celebrations, and community gatherings with full scenography.',
  },
  {
    type: 'dark',
    tag: 'Digital',
    title: 'Hybrid & Digital Events',
    desc: 'Livestreaming, virtual venues, and interactive digital experiences that reach beyond the room.',
  },
];

export default function SignatureExperiences() {
  return (
    <section className={styles.bento}>
      <div className={styles.container}>
        <SectionHeader
          kicker="Signature Experiences"
          title="Moments We Produce"
          sub="Six signature formats, each with a dedicated production playbook refined over hundreds of events."
        />
        <div className={styles.bentoGrid}>
          {experiences.map((e, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              {e.type === 'image' ? (
                <div className={`${styles.bentoCard} ${styles.bentoImage} ${styles.bentoTall}`}>
                  <Image src={e.src} alt={e.alt} fill sizes="(max-width: 640px) 100vw, 33vw" />
                  <span className={styles.bentoTag}>{e.tag}</span>
                  <h3 className={styles.bentoTitle}>{e.title}</h3>
                  <p className={styles.bentoDesc}>{e.desc}</p>
                </div>
              ) : (
                <div
                  className={`${styles.bentoCard} ${e.type === 'dark' ? styles.bentoDark : styles.bentoLight}`}
                >
                  <span className={styles.bentoTag}>{e.tag}</span>
                  <h3 className={styles.bentoTitle}>{e.title}</h3>
                  <p className={styles.bentoDesc}>{e.desc}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
