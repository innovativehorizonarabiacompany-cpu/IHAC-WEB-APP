'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import {
  Cpu, Network, Activity, TrendingUp, Workflow,
  ArrowRight, ChevronRight, ChevronDown, ArrowUpRight, Check,
} from 'lucide-react';
import ITHRION3DShowcase from '@/components/ITHRION3DShowcase';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#E8A73B';
const ITHRION_LOGO = '/images/ithrion-logo-2026.png';
const ITHRION_SVG = '/ITHRION/electric svg-main.svg';

/* ── Core Capabilities data ── */
const CAPABILITIES = [
  {
    icon: Cpu,
    name: 'PLC & SCADA Systems',
    stage: 'System',
    copy: 'PLC, HMI, and SCADA platforms with complete operator visibility and control over every process variable.',
  },
  {
    icon: Network,
    name: 'Industrial IoT Integration',
    stage: 'Data',
    copy: 'Industrial communication protocols that convert sensor data into physical action across the plant.',
  },
  {
    icon: Activity,
    name: 'Real-Time Monitoring',
    stage: 'Control',
    copy: 'Continuous visibility over process variables for decisive, immediate operator control.',
  },
  {
    icon: TrendingUp,
    name: 'Predictive Analytics',
    stage: 'Intelligence',
    copy: 'Next-generation automation that transforms static operations into intelligent, adaptive environments.',
  },
  {
    icon: Workflow,
    name: 'Seamless Integration',
    stage: 'Output',
    copy: 'Five interconnected pillars — from concept to commissioning.',
  },
];

/* ── Engineering Philosophy data ── */
const PHILOSOPHY = [
  {
    num: '01',
    title: 'Precision Engineering',
    copy: 'Panel fabrication, VFD integration, and loop commissioning executed to the highest ISO-certified standards with full FAT/SAT documentation.',
    image: '/ITHRION/hq-resolution-4.jpeg',
    tags: [],
  },
  {
    num: '02',
    title: 'Smart Operations',
    copy: 'Data-driven SCADA platforms with intuitive HMI design, giving operators complete visibility and control over every process variable.',
    image: '/ITHRION/hq-resolution2.jpeg',
    tags: [],
  },
  {
    num: '03',
    title: 'Global Standards',
    copy: 'Partnerships with Allen-Bradley, Siemens, Schneider Electric, and ABB ensure world-class component quality and global supply chain reliability.',
    image: '/ITHRION/hq-resolution-5.jpeg',
    tags: ['Allen-Bradley', 'Siemens', 'Schneider Electric', 'ABB'],
  },
];

/* ── Product catalogue data ── */
const PRODUCTS = [
  {
    id: 'ats',
    num: '01',
    name: 'Automatic Transfer Switches',
    short: 'ATS',
    tagline: 'Reliable, seamless transition between a primary electrical supply and standby power.',
    desc: 'Our Automatic Transfer Switch (ATS) panels provide a reliable and seamless transition between a primary electrical supply and a standby power source, such as a diesel generator. The ATS continuously monitors the main supply — on power failure, voltage abnormality, or phase fault it automatically transfers the load to the standby generator, then safely returns it once the main supply is restored and stable, initiating the generator shutdown sequence after a proper cooling period.',
    specs: [
      'Automatic and manual transfer operation',
      'Automatic generator start and stop commands',
      'Under-voltage, phase failure, and phase sequence detection',
      'Incoming supply voltage monitoring',
      'Engine test mode and automatic return to main supply',
      'Remote status and indication signals',
    ],
    full: [
      {
        label: 'Key features',
        items: [
          'Automatic and manual transfer operation',
          'Adjustable breaker closing time delays',
          'Under-voltage detection',
          'Phase failure detection',
          'Incorrect phase sequence detection',
          'Automatic generator start and stop commands',
          'Incoming supply voltage monitoring',
          'Generator running and fault status indication',
          'MCCB ON/TRIP status indication',
          'Engine test mode',
          'Remote status and indication signals',
          'Automatic return to main supply',
          'Configurable load shedding and priority circuits',
          'Standby and emergency power integration',
        ],
      },
    ],
    image: '/ITHRION/automatic-transfer-switch.jpeg',
  },
  {
    id: 'lv-swgr',
    num: '02',
    name: 'Low Voltage Switchboards & Switchgear',
    short: 'LV Switchboards',
    tagline: 'Safe, reliable, and efficient power distribution — built to IEC 61439-1.',
    desc: 'Engineered and manufactured to provide safe, reliable, and efficient electrical power distribution across industrial, commercial, infrastructure, power generation, and utility applications — including MDBs and SMDBs.',
    specs: [
      'Fixed and withdrawable circuit breaker configurations',
      'IEC 61439-1 compliant',
      'Protection ratings up to IP65',
      'Internal segregation up to Form 4B',
      'Rated current up to 6,300A at up to 690V AC',
      'High-conductivity tinned copper busbars',
    ],
    full: [
      {
        label: 'Key specifications',
        items: [
          'Fixed and withdrawable circuit breaker configurations',
          'IEC 61439-1',
          'Protection ratings up to IP65',
          'Internal segregation up to Form 4B',
          'High-conductivity tinned copper busbars',
          'Standard RAL 7032 finish with custom colours available',
          'Rated operating voltage up to 690V AC',
          'Rated frequency 50/60 Hz',
          'Rated current up to 6,300A',
          'Flexible feeder and bus-coupler configurations',
          'Bus-duct connections',
          'Custom panel arrangements',
        ],
      },
    ],
    image: '/ITHRION/low-voltage-switch-board.jpeg',
  },
  {
    id: 'mcc',
    num: '03',
    name: 'Low Voltage Motor Control Centers',
    short: 'LV MCC',
    tagline: 'Reliable motor control across every starting and speed-control technology.',
    desc: 'Engineered and manufactured using high-quality components to deliver reliable motor control, efficient operation, and long-term performance across industrial applications.',
    specs: [
      'Automatic Star-Delta starters',
      'DOL starters',
      'Soft starters',
      'Variable Frequency Drives',
      'Separation up to Form 4b',
      'Individual motor starter sections',
    ],
    full: [
      {
        label: 'Support',
        items: [
          'Automatic Star-Delta Starters',
          'DOL Starters',
          'Soft Starters',
          'Variable Frequency Drives',
          'Custom configurations',
        ],
      },
      {
        label: 'Key specifications',
        items: [
          'Individual motor starter sections',
          'Separation up to Form 4b',
          'Multiple cable entry options',
          'Dedicated cable connection compartments',
          'Operator and equipment safety',
          'Custom component selection',
          'Custom dimensions',
          'Front and rear access',
          'Modular construction',
          'Flexible busbar configurations',
          'Multiple motor starting and speed-control technologies',
        ],
      },
      {
        label: 'Applications',
        items: [
          'Industrial manufacturing',
          'Water and wastewater',
          'Pumping stations',
          'HVAC',
          'Process plants',
          'Infrastructure',
          'Commercial and industrial facilities',
        ],
      },
    ],
    image: '/ITHRION/low-voltage-motor-control-centre.jpeg',
  },
  {
    id: 'panel-boards',
    num: '04',
    name: 'Low Voltage Panel Boards',
    short: 'Panel Boards',
    tagline: 'Fully custom-engineered distribution — safety and maintainability focused.',
    desc: 'Engineered based on extensive electrical installation and project execution experience, with safety and maintainability at the core of every configuration.',
    specs: [
      'Busbar ratings up to 4000A',
      'Compartmentalized cubicle construction',
      'Up to Form 4 internal separation',
      'Automatic and PLC-based source changeover',
      'Front and rear access',
      'Top and bottom cable entry',
    ],
    full: [
      {
        label: 'Key specifications',
        items: [
          'Fully custom-engineered',
          'Busbar ratings up to 4000A',
          'Compartmentalized cubicle construction',
          'Free-standing floor-mounted configuration',
          'Extendable from both sides',
          'Top/bottom cable entry',
          'Up to Form 4 internal separation',
          'Front/rear access',
          'Single/double busbar configurations',
          'Automatic source changeover',
          'PLC-based source changeover',
          'Outdoor configurations',
          'Safety and maintainability focused',
        ],
      },
    ],
    image: '/ITHRION/low-voltage-panel-board.jpeg',
  },
  {
    id: 'apfc',
    num: '05',
    name: 'Automatic Power Factor Correction Panels',
    short: 'APFC',
    tagline: 'Cut reactive power losses and avoid utility penalties automatically.',
    desc: "IHAC's APFC panels automatically correct reactive power demand through microprocessor-based control and staged capacitor switching.",
    specs: [
      'Microprocessor-based automatic capacitor switching',
      '4 / 6 / 8+ stage configurations',
      'Target power factor 0.95–0.99 lagging',
      'Reduced line losses',
      'Reduced utility penalties',
      'Detuned reactor options for harmonic-heavy sites',
    ],
    full: [],
    image: '/ITHRION/Automatic_Power_Factor_Correction.png',
  },
  {
    id: 'sync',
    num: '06',
    name: 'Generator Synchronization Panels',
    short: 'Sync Panels',
    tagline: 'Parallel multiple generators — or generators and grid — with precision.',
    desc: 'Automatic phase, voltage, and frequency matching for multi-generator load sharing and seamless grid synchronisation.',
    specs: [
      'Automatic phase matching',
      'Voltage matching',
      'Frequency matching',
      'Multi-generator load sharing',
      'Automatic load-based start and stop',
      'Grid-generator and generator-generator synchronisation',
    ],
    full: [
      {
        label: 'Key specifications',
        items: [
          'Automatic phase matching',
          'Voltage matching',
          'Frequency matching',
          'Multi-generator load sharing',
          'Automatic load-based start/stop',
          'Grid-generator synchronisation',
          'Generator-generator synchronisation',
          'Large multi-generator busbar systems',
        ],
      },
    ],
    image: '/ITHRION/Generator_Synchronization_Panels.png',
  },
  {
    id: 'substation',
    num: '07',
    name: 'Package & Unit Substations',
    short: 'Substations',
    tagline: 'Complete MV-to-LV power conversion in a single factory-tested enclosure.',
    desc: 'RMU, transformer, and LV panel factory-assembled and fully tested — sized to your project\u2019s MV voltage and load requirements.',
    specs: [
      'RMU, transformer, and LV panel in one enclosure',
      'Factory assembled and fully tested',
      'Oil-filled and dry-type transformer options',
      'Project-specific MV voltage and load sizing',
      'Building applications',
      'Infrastructure and industrial applications',
    ],
    full: [
      {
        label: 'Key specifications',
        items: [
          'RMU',
          'Transformer',
          'LV panel',
          'Factory assembled',
          'Fully tested',
          'Oil-filled transformer options',
          'Dry-type transformer options',
          'Project-specific MV voltage/load sizing',
          'Building applications',
          'Infrastructure applications',
          'Industrial applications',
        ],
      },
    ],
    image: '/ITHRION/Package%26Unit_Substation.png',
  },
  {
    id: 'plc',
    num: '08',
    name: 'Control Panels — PLC / Automation',
    short: 'PLC Panels',
    tagline: 'The command center for automated industrial processes.',
    desc: 'Control panels house PLCs, HMIs, relays, VFDs, and protection devices that convert sensor data into physical action.',
    specs: [
      'Custom PLC/HMI automation panels',
      'Factory tested with bolted expandable construction',
      'SCADA / BMS integration',
      'Industrial communication protocols',
      'IP54 indoor and IP65 wash-down / outdoor options',
      'Food, HVAC, water, and oil & gas applications',
    ],
    full: [
      {
        label: 'Key specifications',
        items: [
          'Custom PLC/HMI automation panels',
          'Factory tested',
          'Bolted expandable construction',
          'SCADA/BMS integration',
          'Industrial communication protocols',
          'IP54 indoor options',
          'IP65 wash-down/outdoor options',
        ],
      },
      {
        label: 'Applications',
        items: ['Food processing', 'HVAC', 'Water treatment', 'Oil & gas'],
      },
    ],
    image: '/ITHRION/Control_Panels%20(PLC%20Automation).png',
  },
  {
    id: 'racks',
    num: '09',
    name: 'Switch Racks',
    short: 'Switch Racks',
    tagline: 'Custom-built, pre-wired power racks for harsh operating environments.',
    desc: 'Fully custom-engineered, factory pre-wired and tested power racks — single- or dual-sided — built for damp, wet, and corrosive environments.',
    specs: [
      'Fully custom engineered',
      'Single-sided and dual-sided configurations',
      'Damp / wet / corrosive environment support',
      'Factory pre-wired and tested',
      'Single-phase support',
      'Three-phase LV power support',
    ],
    full: [
      {
        label: 'Key specifications',
        items: [
          'Fully custom engineered',
          'Single-sided configurations',
          'Dual-sided configurations',
          'Damp/wet/corrosive environment support',
          'Factory pre-wired',
          'Factory tested',
          'Single-phase support',
          'Three-phase LV power support',
        ],
      },
    ],
    image: '/ITHRION/switch_racks.png',
  },
];

/* ── Catalogue motion variants ── */
const CATALOGUE_VARIANTS = {
  panel: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, when: 'beforeChildren', staggerChildren: 0.07 } },
    exit: { opacity: 0, y: 16, transition: { duration: 0.22 } },
  },
  img: {
    hidden: { opacity: 0, scale: 1.05, x: 28 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
  },
  info: {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

/* ── Section header reveal system ── */
const HEAD_UP = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const HEAD_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const EYEBROW_LINE = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.65, ease: 'easeInOut' } },
};

const EYEBROW_NODE = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.35, delay: 0.55, ease: 'easeOut' } },
};

function IthEyebrow({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="ith-eyebrow"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <svg width="56" height="5" viewBox="0 0 56 5" fill="none" aria-hidden="true">
        <motion.path d="M0 2.5 H48" stroke="#C88A1A" strokeWidth="3" strokeLinecap="round" variants={EYEBROW_LINE} />
        <motion.circle cx="48" cy="2.5" r="2.5" fill="#C88A1A" variants={EYEBROW_NODE} />
      </svg>
      {children}
    </motion.span>
  );
}

function IthHeader({ eyebrow, title, sub }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="ith-section-head"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={HEAD_CONTAINER}
    >
      <IthEyebrow>{eyebrow}</IthEyebrow>
      <motion.h2 variants={HEAD_UP}>{title}</motion.h2>
      {sub && <motion.p variants={HEAD_UP}>{sub}</motion.p>}
    </motion.div>
  );
}

function CircuitSVG({ onReady }) {
  const pathRefs = useRef([]);
  const nodeRefs = useRef([]);

  useEffect(() => {
    if (!pathRefs.current.length || !nodeRefs.current.length) return;
    const tl = anime.timeline({
      easing: 'easeInOutCubic',
      complete: () => onReady?.(),
    });
    tl.add({
      targets: pathRefs.current,
      strokeDashoffset: [anime.setDashoffset, 0],
      delay: anime.stagger(60, { from: 'center' }),
      duration: 600,
    }, 0);
    anime({
      targets: nodeRefs.current,
      scale: [{ value: 1.4, duration: 800 }, { value: 1, duration: 800 }],
      opacity: [{ value: 0.9, duration: 800 }, { value: 0.3, duration: 800 }],
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(400, { from: 'center' }),
    });
    return () => tl.pause();
  }, []);

  const w = 600, h = 600;

  const paths = [
    'M 50 50 L 550 50 L 550 550 L 50 550 Z',
    'M 50 150 L 550 150',
    'M 50 250 L 550 250',
    'M 50 350 L 550 350',
    'M 50 450 L 550 450',
    'M 150 50 L 150 550',
    'M 250 50 L 250 550',
    'M 350 50 L 350 550',
    'M 450 50 L 450 550',
    'M 50 100 L 150 100 L 150 200',
    'M 250 150 L 250 250 L 350 250',
    'M 450 350 L 450 450 L 550 450',
    'M 50 350 L 150 350 L 150 450',
    'M 350 50 L 350 150 L 450 150',
    'M 250 350 L 350 350 L 350 450',
    'M 150 250 L 250 250',
    'M 350 150 L 350 250',
    'M 150 450 L 250 450',
    'M 450 250 L 550 250',
  ];

  const nodes = [
    [50,50], [150,50], [250,50], [350,50], [450,50], [550,50],
    [50,150], [150,150], [250,150], [350,150], [450,150], [550,150],
    [50,250], [150,250], [250,250], [350,250], [450,250], [550,250],
    [50,350], [150,350], [250,350], [350,350], [450,350], [550,350],
    [50,450], [150,450], [250,450], [350,450], [450,450], [550,450],
    [50,550], [150,550], [250,550], [350,550], [450,550], [550,550],
  ];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="ithrion-circuit-overlay">
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.5" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={`p-${i}`}
          ref={el => { pathRefs.current[i] = el; }}
          d={d}
          fill="none"
          stroke="url(#cg1)"
          strokeWidth={0.75}
          strokeLinecap="round"
          opacity={0.35}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`n-${i}`}
          ref={el => { nodeRefs.current[i] = el; }}
          cx={cx} cy={cy} r={2}
          fill={ACCENT}
          opacity={0.3}
          transformOrigin={`${cx}px ${cy}px`}
        />
      ))}
    </svg>
  );
}

/* ── Section 01: Core Capabilities ── */
function CoreCapabilities() {
  const systemRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const system = systemRef.current;
    if (!system) return;
    const nodes = system.querySelectorAll('.ith-core-node');
    const line = system.querySelector('.ith-core-line-fill');
    const legendLine = system.querySelector('.ith-core-legend-line');
    if (!nodes.length || !line) return;

    const st = ScrollTrigger.create({
      trigger: system,
      start: 'top 82%',
      end: 'bottom 55%',
      scrub: 0.6,
      onEnter: () => {
        gsap.to(nodes, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12 });
        if (legendLine) {
          gsap.fromTo(legendLine, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.out' });
        }
      },
      onUpdate: (self) => {
        line.style.transform = `scaleY(${self.progress})`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="ith-core">
      <div className="ith-container">
        <div className="ith-core-head">
          <div className="ith-section-head">
            <IthEyebrow>Core Capabilities</IthEyebrow>
            <h2>
              Precision.<br />
              Intelligence. <span className="ith-accent">Delivered.</span>
            </h2>
            <p>Five interconnected pillars that define our approach to industrial automation — from concept to commissioning.</p>
          </div>
          <motion.div
            className="ith-core-statement"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img src={ITHRION_SVG} alt="ITHRION emblem" className="ith-core-emblem" loading="lazy" />
            <h3>Opening The Future</h3>
            <p>We design and deploy next-generation industrial automation ecosystems that transform static operations into intelligent, adaptive production environments.</p>
          </motion.div>
        </div>

        <div className="ith-core-system" ref={systemRef}>
          <div className="ith-core-legend" aria-hidden="true">
            {CAPABILITIES.map((c, i) => (
              <span key={c.stage} className="ith-core-legend-item">
                {i > 0 && <span className="ith-core-legend-arrow">&rarr;</span>}
                {c.stage}
              </span>
            ))}
          </div>
          <span className="ith-core-legend-line" aria-hidden="true" />
          <div className="ith-core-nodes">
            <span className="ith-core-line-base" aria-hidden="true" />
            <span className="ith-core-line-fill" aria-hidden="true" />
            {CAPABILITIES.map((c, i) => (
              <div key={c.name} className={'ith-core-node' + (active === i ? ' active' : '')}>
                <button
                  type="button"
                  className="ith-core-node-btn"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <span className="ith-core-node-idx">0{i + 1}</span>
                  <span className="ith-core-node-ico"><c.icon size={18} strokeWidth={1.6} /></span>
                  <span className="ith-core-node-txt">
                    <span className="ith-core-node-name">{c.name}</span>
                    <span className="ith-core-node-copy">{c.copy}</span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 02: Engineering Philosophy ── */
const PHIL_EASE = [0.25, 0.1, 0.25, 1];

const PHIL_CHAPTER_V = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const PHIL_NUM_V = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: PHIL_EASE } },
};

const PHIL_EYE_V = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: PHIL_EASE } },
};

const PHIL_H_V = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: PHIL_EASE } },
};

const PHIL_P_V = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: PHIL_EASE } },
};

const PHIL_TAGS_V = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: PHIL_EASE } },
};

const PHIL_PHOTO_V = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: PHIL_EASE } },
};

function PhilosophySection() {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const chapters = Array.from(list.children);
    if (!chapters.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.idx));
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 }
    );
    chapters.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="ith-phil">
      <div className="ith-container">
        <IthHeader
          eyebrow="Engineering Philosophy"
          title={<>The way we <span className="ith-accent">engineer</span></>}
          sub="Three disciplines that define every system we deliver — from the first drawing to final commissioning."
        />

        <div className="ith-phil-chapters" ref={listRef}>
          {PHILOSOPHY.map((p, i) => (
            <motion.article
              key={p.num}
              className={'ith-phil-chapter' + (active === i ? ' active' : active > i ? ' done' : '')}
              data-idx={i}
              initial={reduce ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={PHIL_CHAPTER_V}
            >
              <motion.span className="ith-phil-num" variants={PHIL_NUM_V} aria-hidden="true">
                {p.num}
                <span className="ith-phil-num-line" />
              </motion.span>

              <div className="ith-phil-copy">
                <motion.span className="ith-phil-eyebrow" variants={PHIL_EYE_V}>
                  {p.num} / {p.title}
                </motion.span>
                <motion.h3 variants={PHIL_H_V}>{p.title}</motion.h3>
                <motion.p variants={PHIL_P_V}>{p.copy}</motion.p>
                {p.tags.length > 0 && (
                  <motion.div className="ith-phil-tags" variants={PHIL_TAGS_V}>
                    {p.tags.map((t) => (
                      <span key={t} className="ith-phil-tag">{t}</span>
                    ))}
                  </motion.div>
                )}
                <motion.span className="ith-phil-arrow" variants={PHIL_EYE_V} aria-hidden="true">
                  <svg width="28" height="9" viewBox="0 0 28 9" fill="none">
                    <path d="M0 4.5 H25" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M21 1 L25.5 4.5 L21 8" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  </svg>
                </motion.span>
              </div>

              <motion.div className="ith-phil-visual" variants={PHIL_PHOTO_V}>
                <figure className="ith-phil-photo">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <figcaption>DWG-{p.num} · {p.title}</figcaption>
                </figure>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 03: Product Catalogue ── */
const CAT_DURATION = 7000;

function CatalogueSection() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const p = PRODUCTS[active];
  const progressRef = useRef(null);
  const timerRef = useRef(null);
  const bodyRef = useRef(null);
  const hoverEnabled = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    hoverEnabled.current = window.matchMedia('(hover: hover)').matches;
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const paused = hoverPaused || offscreen || tabHidden;

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    if (paused || reduced.current) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    anime.remove(el);
    el.style.width = '0%';
    anime({ targets: el, width: '100%', duration: CAT_DURATION, easing: 'easeInOutSine' });
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PRODUCTS.length);
      setOpen(false);
    }, CAT_DURATION);
    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  }, [active, paused]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return (
    <section className="ith-cat">
      <div className="ith-container">
        <IthHeader
          eyebrow="Electrical Systems"
          title={<>The systems <span className="ith-accent">we build</span></>}
          sub="An interactive catalogue of the electrical panels and control systems we engineer, manufacture, and commission."
        />

        <div
          className="ith-cat-body"
          ref={bodyRef}
          onMouseEnter={() => hoverEnabled.current && setHoverPaused(true)}
          onMouseLeave={() => hoverEnabled.current && setHoverPaused(false)}
        >
          <nav className="ith-cat-nav" aria-label="Electrical systems catalogue">
            <span
              className="ith-cat-indicator"
              style={{ '--cat-idx': active }}
              aria-hidden="true"
            />
            {PRODUCTS.map((prod, i) => (
              <button
                key={prod.id}
                type="button"
                className={'ith-cat-nav-btn' + (i === active ? ' active' : '')}
                onClick={() => {
                  if (i !== active) {
                    setActive(i);
                    setOpen(false);
                  }
                }}
                aria-current={i === active ? 'true' : undefined}
              >
                <span className="ith-cat-nav-num">{prod.num}</span>
                <span className="ith-cat-nav-name">{prod.short}</span>
              </button>
            ))}
          </nav>

          <div className="ith-cat-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="ith-cat-panel"
                variants={CATALOGUE_VARIANTS.panel}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span className="ith-cat-progress" aria-hidden="true">
                  <span className="ith-cat-progress-fill" ref={progressRef} />
                </span>
                <motion.div className="ith-cat-media" variants={CATALOGUE_VARIANTS.img}>
                  <img src={p.image} alt={p.name} loading="lazy" className="ith-cat-media-img" />
                  <span className="ith-cat-media-num" aria-hidden="true">{p.num}</span>
                </motion.div>
                <div className="ith-cat-info">
                  <motion.div variants={CATALOGUE_VARIANTS.info}>
                    <IthEyebrow>Electrical Systems / {p.num}</IthEyebrow>
                    <h3>{p.name}</h3>
                    {p.tagline && <p className="ith-cat-tagline">{p.tagline}</p>}
                    <p className="ith-cat-desc">{p.desc}</p>
                  </motion.div>
                  <motion.ul className="ith-cat-specs" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                    {p.specs.map((s) => (
                      <motion.li key={s} variants={CATALOGUE_VARIANTS.item}>
                        <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                        {s}
                      </motion.li>
                    ))}
                  </motion.ul>
                  {p.full.length > 0 && (
                    <div className="ith-cat-expand">
                      <button
                        type="button"
                        className={'ith-cat-expand-btn' + (open ? ' open' : '')}
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                      >
                        {open ? 'Hide full specifications' : 'View full specifications'}
                        <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key="full-specs"
                            className="ith-cat-fullwrap"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                          >
                            {p.full.map((section) => (
                              <div key={section.label} className="ith-cat-full-sec">
                                <span className="ith-cat-full-label">{section.label}</span>
                                <ul className="ith-cat-full">
                                  {section.items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  <motion.div className="ith-cat-cta-row" variants={CATALOGUE_VARIANTS.info}>
                    <Link href="/contact" className="ith-cat-cta">
                      Discuss this system <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 04: 3D Showcase ── */
function ShowcaseSection() {
  return (
    <section className="ith3d-section">
      <div className="ith-container">
        <IthHeader
          eyebrow="3D Showcase"
          title={<>Engineered in <span className="ith-accent">Three Dimensions</span></>}
          sub="Explore selected electrical systems in an interactive 3D environment."
        />
        <ITHRION3DShowcase />
      </div>
    </section>
  );
}

export default function AutomationPage() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const barRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);

  /* ── Hero: GSAP staggered entrance + parallax setup ── */
  useEffect(() => {
    const hero = heroRef.current;
    const parallax = parallaxRef.current;
    const logo = logoRef.current;
    const bar = barRef.current;
    const sub = subRef.current;
    const actions = actionsRef.current;
    const title = titleRef.current;
    if (!hero || !title || !logo || !bar || !sub || !actions) return;

    const words = title.querySelectorAll('.ith-hero-word');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

    tl.fromTo(logo, { opacity: 0, y: 24, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 1.0 }, 0.15)
      .fromTo(words, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, 0.55)
      .fromTo(bar, { width: '0%' }, { width: '56px', duration: 0.5 }, 0.8)
      .fromTo(sub, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.9)
      .fromTo(actions, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.05)
      .call(() => {
        gsap.set([logo, words, bar, sub, actions], { clearProps: 'all' });
      });

    if (parallax) {
      const parallaxTween = gsap.to(parallax, {
        y: () => hero.offsetHeight * 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tl.kill();
        parallaxTween.scrollTrigger && parallaxTween.scrollTrigger.kill();
        parallaxTween.kill();
      };
    }

    return () => {
      tl.kill();
    };
  }, []);

  const heroTitle = "We engineer intelligent industrial solutions that power tomorrow's infrastructure";

  return (
    <div className="ithrion-section">
      {/* ── HERO ── */}
      <section className="ith-hero" ref={heroRef}>
        <div className="ith-hero-bg" ref={parallaxRef} aria-hidden="true">
          <div className="ith-hero-grid-texture" />
        </div>

        <CircuitSVG />

        <div className="ith-hero-inner">
          <div className="ith-hero-logo" ref={logoRef}>
            <img src={ITHRION_LOGO} alt="ITHRION" />
          </div>

          <div className="ith-hero-content">
            <h1 className="ith-hero-title" ref={titleRef}>
              {heroTitle.split(' ').map((w, i) => (
                <span key={i} className="ith-hero-word">{w}{' '}</span>
              ))}
            </h1>

            <div className="ith-hero-bar" ref={barRef} aria-hidden="true" />

            <p className="ith-hero-sub" ref={subRef}>
              From PLC panel design to enterprise-wide SCADA ecosystems — we deliver precision-engineered automation solutions that drive operational excellence across industries.
            </p>

            <div className="ith-hero-actions" ref={actionsRef}>
              <Link href="/contact" className="ithrion-btn-primary">
                <span className="ith-btn-label">Start Your Project</span>
                <ArrowRight size={16} strokeWidth={2} className="ith-btn-arrow" />
              </Link>
              <Link href="/solutions" className="ithrion-btn-secondary">
                <span className="ith-btn-label">View All Solutions</span>
                <ChevronRight size={16} strokeWidth={2} className="ith-btn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CoreCapabilities />
      <PhilosophySection />
      <CatalogueSection />
      <ShowcaseSection />
    </div>
  );
}
