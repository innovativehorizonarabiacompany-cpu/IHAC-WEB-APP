'use client';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Layers, MapPin, ClipboardCheck } from 'lucide-react';
import DrawIcon from './DrawIcon';
import SectionHeader from './SectionHeader';
import styles from './creative.module.css';

const ease = [0.22, 1, 0.36, 1];

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We audit your brand, audience, and campaign goals to define the creative direction and budget envelope.',
    icon: Lightbulb,
    dark: false,
    panel: {
      kicker: 'What happens',
      title: 'A structured discovery sprint',
      body: 'Stakeholder interviews, brand audit, and market scan that turn ambiguity into a clear creative brief.',
      bullets: ['Brand & audience audit', 'Stakeholder interviews', 'Creative brief & budget', 'Project roadmap'],
      metric: '3-day turnaround',
    },
  },
  {
    num: '02',
    title: 'Concept & Design',
    desc: 'Moodboards, storyboards, and mock-ups that translate strategy into a distinct visual language.',
    icon: PenTool,
    dark: true,
    panel: {
      kicker: 'What you get',
      title: 'A visual language you approve',
      body: 'Two full design rounds with senior art direction, refined until every placement matches the brand.',
      bullets: ['Moodboards & storyboards', 'Placement mock-ups', 'Material & finish specs', 'Two design rounds'],
      metric: '48h first concepts',
    },
  },
  {
    num: '03',
    title: 'Production & Fabrication',
    desc: 'In-house fabrication, printing, and build for POSM, signage, exhibition stands, and event sets.',
    icon: Layers,
    dark: false,
    panel: {
      kicker: 'What we run',
      title: 'An in-house production floor',
      body: 'Fabrication, large-format print, and finishing under one roof with quality control at every gate.',
      bullets: ['POSM & print production', 'Stand & set fabrication', 'QA & finishing', 'Packing & logistics'],
      metric: 'ISO-controlled facility',
    },
  },
  {
    num: '04',
    title: 'Installation & Staging',
    desc: 'On-site installation, AV integration, and scenic staging executed to the minute.',
    icon: MapPin,
    dark: true,
    panel: {
      kicker: 'What we deliver',
      title: 'Precision on-site delivery',
      body: 'Site surveys, permits, AV and scenic rigging, and a full rehearsal before doors open.',
      bullets: ['Site survey & permits', 'AV & lighting rig', 'Scenic installation', 'Full rehearsal'],
      metric: '24h pre-event readiness',
    },
  },
  {
    num: '05',
    title: 'Delivery & Follow-through',
    desc: 'Live event execution, de-rigging, and post-event reporting that measures real impact.',
    icon: ClipboardCheck,
    dark: false,
    panel: {
      kicker: 'What we measure',
      title: 'Impact measured, not assumed',
      body: 'Event delivery, de-rig, and a post-event report with attendance, coverage, and media recap.',
      bullets: ['Live event delivery', 'De-rig & logistics', 'Post-event report', 'Media & photo recap'],
      metric: '7-day report',
    },
  },
];

export default function CreativeProcess() {
  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <SectionHeader
          kicker="Our Process"
          title="From Brief to Brand Moment"
          sub="A five-step pipeline that keeps every project on brief, on budget, and on schedule."
        />
        <div className={styles.processTrack}>
          {steps.map((s, i) => {
            const even = i % 2 === 0;
            return (
              <div
                key={i}
                className={`${styles.processRow} ${even ? styles.rowEven : styles.rowOdd}`}
              >
                <div className={styles.processMiddle}>
                  <motion.span
                    className={styles.processSegment}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'top' }}
                  />
                  <span className={styles.processDot} />
                </div>

                <div className={styles.processCardWrap}>
                  <motion.div
                    className={`${styles.processCard} ${s.dark ? styles.processCardDark : styles.processCardLight}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: 0.65, ease }}
                  >
                    <span className={styles.processNumber}>{s.num}</span>
                    <h3 className={styles.processTitle}>{s.title}</h3>
                    <p className={styles.processDesc}>{s.desc}</p>
                  </motion.div>
                </div>

                <div className={`${styles.processConnector} ${even ? styles.connectorRight : styles.connectorLeft}`}>
                  <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
                    <motion.path
                      d={even ? 'M0 0.5 H100' : 'M100 0.5 H0'}
                      stroke="#C88A1A"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                    />
                  </svg>
                </div>

                <div className={styles.processPanel}>
                  <DrawIcon icon={s.icon} size={20} drawDelay={0.6} className={styles.processPanelIcon} />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.75, ease }}
                  >
                    <span className={styles.processPanelKicker}>{s.panel.kicker}</span>
                    <h4 className={styles.processPanelTitle}>{s.panel.title}</h4>
                    <p className={styles.processPanelBody}>{s.panel.body}</p>
                  </motion.div>
                  <ul className={styles.processPanelList}>
                    {s.panel.bullets.map((b, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 1.05 + j * 0.1, ease }}
                      >
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.span
                    className={styles.processPanelMetric}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 1.5, ease }}
                  >
                    {s.panel.metric}
                  </motion.span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}