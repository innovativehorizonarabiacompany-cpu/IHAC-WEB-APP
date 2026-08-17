'use client';
import styles from './AboutIHAC.module.css';

const BUS = 'M 130 40 H 1070';
const DROPS = 'M 200 40 V 100 M 600 40 V 100 M 1000 40 V 100';
const ELBOWS = 'M 200 100 H 232 M 600 100 H 632 M 1000 100 H 1032';
const TICK_X = [158, 242, 558, 642, 958, 1042];
const JUNCTIONS = [
  [200, 40],
  [600, 40],
  [1000, 40],
];

export default function EngineeringConnections() {
  return (
    <div className={styles.connections} aria-hidden="true">
      <svg
        className={styles.connSvg}
        viewBox="0 0 1200 110"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g stroke="#171717" strokeWidth="1.25" fill="none" opacity="0.5" vectorEffect="non-scaling-stroke">
          <path className={styles.connPath} d={BUS} />
          <path className={styles.connPath} d={DROPS} />
          <path className={styles.connPath} d={ELBOWS} />
        </g>
        <g stroke="#171717" strokeWidth="1.25" fill="none" opacity="0.5" vectorEffect="non-scaling-stroke">
          {TICK_X.map((tx) => (
            <path key={tx} className={styles.connTick} d={`M ${tx} 34 V 46`} />
          ))}
        </g>
        <g fill="#171717" vectorEffect="non-scaling-stroke">
          {JUNCTIONS.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} className={styles.junction} cx={cx} cy={cy} r="3.5" />
          ))}
        </g>
        <circle className={styles.signal} cx="130" cy="40" r="3" fill="#FFD400" vectorEffect="non-scaling-stroke" opacity="0" />
      </svg>
    </div>
  );
}
