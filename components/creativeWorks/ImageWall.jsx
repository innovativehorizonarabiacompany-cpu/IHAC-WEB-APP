'use client';
import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import styles from './creative.module.css';

const shots = [
  { src: '/images/event_management/clients_cpnversing_with_each_other.png', shape: styles.wallWide, alt: 'Clients conversing at an event' },
  { src: '/images/event_management/person_speaking.png', shape: styles.wallTall, alt: 'Speaker addressing attendees' },
  { src: '/images/event_management/person_holding_passes.png', shape: '', alt: 'Attendee holding event passes' },
  { src: '/images/event_management/person_conducting_examination.png', shape: '', alt: 'Exhibition visit in progress' },
  { src: '/images/event_management/international_PX_confress.png', shape: styles.wallWide, alt: 'International conference in session' },
  { src: '/images/event_management/daylight_exterior.png', shape: '', alt: 'Venue exterior in daylight' },
  { src: '/images/event_management/empty_seats_top_view.png', shape: styles.wallTall, alt: 'Seating from above' },
  { src: '/images/event_management/empty_sofas_setting.png', shape: '', alt: 'Lounge sofas staged for guests' },
  { src: '/images/event_management/venue_arrangement_shot.png', shape: '', alt: 'Arranged venue hall' },
];

export default function ImageWall() {
  return (
    <section className={styles.wall}>
      <div className={styles.container}>
        <SectionHeader
          kicker="The Gallery"
          title="From Our Productions"
          sub="Real moments from events, exhibitions, and activations delivered across the Kingdom."
        />
        <div className={styles.wallGrid}>
          {shots.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className={`${styles.wallTile} ${s.shape}`}>
                <Image src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 50vw, 33vw" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}