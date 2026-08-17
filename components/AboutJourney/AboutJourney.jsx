'use client';
import { motion } from 'framer-motion';
import { Factory, Wrench, Globe, Hammer, HardHat, Handshake } from 'lucide-react';
import DrawIcon from '@/components/creativeWorks/DrawIcon';
import SectionHeader from '@/components/creativeWorks/SectionHeader';
import styles from './AboutJourney.module.css';

const ease = [0.22, 1, 0.36, 1];

const milestones = [
  {
    num: '01',
    title: 'Establishment in Pakistan',
    desc: 'The company was established in Pakistan as an engineering company, providing industrial products, technical expertise, and reliable engineering solutions. This marked the foundation for its long-term growth and expansion into the industrial sector.',
    icon: Factory,
    dark: true,
    panel: {
      kicker: '2021',
      title: 'Establishment in Pakistan',
      body: 'The company began as an engineering company in Pakistan, providing industrial products, technical expertise, and reliable engineering solutions that laid the foundation for its long-term growth in the industrial sector.',
      bullets: [
        'Industrial products and technical expertise',
        'Reliable engineering solutions',
        'Foundation for long-term growth and expansion',
      ],
      metric: 'Founded in Pakistan',
    },
  },
  {
    num: '02',
    title: 'Expansion into Industrial Engineering Solutions',
    desc: 'Operations were expanded to deliver larger-scale industrial engineering solutions, allowing the company to undertake more complex projects and serve a broader range of industrial clients with enhanced technical capabilities.',
    icon: Wrench,
    dark: false,
    panel: {
      kicker: '2022',
      title: 'Expansion into Industrial Engineering Solutions',
      body: 'Operations were scaled up to deliver larger-scale industrial engineering solutions, enabling the company to take on more complex projects and serve a broader range of industrial clients with enhanced technical capabilities.',
      bullets: [
        'Larger-scale industrial engineering solutions',
        'Undertaking more complex projects',
        'Broader range of industrial clients',
      ],
      metric: 'Industrial engineering solutions',
    },
  },
  {
    num: '03',
    title: 'First International Office in KSA',
    desc: 'The company established its first international office in the Kingdom of Saudi Arabia (KSA), strengthening its regional presence and enabling the delivery of engineering and contracting services across international markets.',
    icon: Globe,
    dark: true,
    panel: {
      kicker: '2023',
      title: 'First International Office in KSA',
      body: 'The first international office was established in the Kingdom of Saudi Arabia (KSA), strengthening regional presence and enabling the delivery of engineering and contracting services across international markets.',
      bullets: [
        'First international office in KSA',
        'Strengthened regional presence',
        'Engineering and contracting services across international markets',
      ],
      metric: 'First international office',
    },
  },
  {
    num: '04',
    title: 'Steel Fabrication Division',
    desc: 'The company expanded its capabilities by entering the steel fabrication sector, manufacturing fabricated steel components for industrial and commercial applications while enhancing production capacity and project execution capabilities.',
    icon: Hammer,
    dark: false,
    panel: {
      kicker: '2024',
      title: 'Steel Fabrication Division',
      body: 'The company entered the steel fabrication sector, manufacturing fabricated steel components for industrial and commercial applications while enhancing production capacity and project execution capabilities.',
      bullets: [
        'Manufacturing fabricated steel components',
        'Industrial and commercial applications',
        'Enhanced production capacity and project execution',
      ],
      metric: 'Steel fabrication',
    },
  },
  {
    num: '05',
    title: 'Structural Fabrication & Installation',
    desc: 'The company began providing complete structural fabrication and installation services in accordance with international quality and safety standards. During this period, its service portfolio further expanded to include:',
    icon: HardHat,
    dark: true,
    panel: {
      kicker: '2025',
      title: 'Structural Fabrication & Installation',
      body: 'Complete structural fabrication and installation services were introduced in accordance with international quality and safety standards, with the service portfolio expanding across multiple disciplines.',
      bullets: [
        'Structural steel fabrication and installation',
        'Electrical panel integration and system implementation',
        'Civil construction and interior fit-out works',
      ],
      metric: 'Structural fabrication & installation',
    },
  },
  {
    num: '06',
    title: 'Complete Industrial Solutions',
    desc: 'The company evolved into a comprehensive industrial solutions provider, delivering complete metal works, electrical and instrumentation panel fabrication and installation, and executing multiple turnkey projects covering a wide range of contracting scopes. This milestone reflected the company\'s ability to provide end-to-end engineering, fabrication, installation, and project execution services.',
    icon: Handshake,
    dark: false,
    panel: {
      kicker: '2026',
      title: 'Complete Industrial Solutions',
      body: 'The company evolved into a comprehensive industrial solutions provider, delivering complete metal works, electrical and instrumentation panel fabrication and installation, and executing multiple turnkey projects across a wide range of contracting scopes — end-to-end engineering, fabrication, installation, and project execution.',
      bullets: [
        'Complete metal works',
        'Electrical and instrumentation panel fabrication and installation',
        'Multiple turnkey projects across contracting scopes',
      ],
      metric: 'End-to-end project execution',
    },
  },
];

export default function AboutJourney() {
  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <SectionHeader
          kicker="Our Journey"
          title="Company Milestones"
        />
        <div className={styles.processTrack}>
          {milestones.map((s, i) => {
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
                  <DrawIcon icon={s.icon} size={28} drawDelay={0.6} className={styles.processPanelIcon} />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.75, ease }}
                  >
                    <div className={styles.processPanelYear}>
                      <span className={styles.processPanelKicker}>{s.panel.kicker}</span>
                      <motion.span
                        className={styles.processPanelLine}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.85, ease: 'linear' }}
                      />
                    </div>
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
