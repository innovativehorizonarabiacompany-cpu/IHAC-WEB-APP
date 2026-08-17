'use client';
import { industriesData } from '@/data/siteData';
import styles from './SectorSection.module.css';

export const SECTOR_PALETTE = {
  bg: '#F8F8F6',
  yellow: '#FFD400',
  inactive: 'rgba(255,212,0,0.18)',
  dark: '#171717',
  grey: '#707070',
  line: '#E6E6E6',
};

export const SECTOR_COUNT = industriesData.length;
const SPAN = 20;
export const CX = 300;
export const CY = 300;
export const RO = 215;
export const RI = 165;
export const RM = (RO + RI) / 2;
export const STROKE_W = RO - RI;
export const BR = 24;
export const BO = 32;

export const SEGMENTS = Array.from({ length: SECTOR_COUNT }, (_, i) => {
  const mid = -90 + i * (360 / SECTOR_COUNT);
  return { mid, start: mid - SPAN / 2, end: mid + SPAN / 2 };
});

const rnd = (v) => Math.round(v * 1000) / 1000;

export function segArc(cx, cy, r, sa, ea) {
  const rad = (d) => (d * Math.PI) / 180;
  const sx = rnd(cx + r * Math.cos(rad(sa)));
  const sy = rnd(cy + r * Math.sin(rad(sa)));
  const ex = rnd(cx + r * Math.cos(rad(ea)));
  const ey = rnd(cy + r * Math.sin(rad(ea)));
  const la = ea - sa > 180 ? 1 : 0;
  return `M${sx},${sy}A${r},${r} 0 ${la},1 ${ex},${ey}`;
}

export function badgePos(index, extraRot = 0) {
  const r = ((SEGMENTS[index].mid + extraRot) * Math.PI) / 180;
  return { x: rnd(CX + (RO + BO) * Math.cos(r)), y: rnd(CY + (RO + BO) * Math.sin(r)) };
}

export default function Infographic({
  activeIndex,
  ringRef,
  segRefs,
  badgeGroupRef,
  numberRef,
  endpointRef,
  initBadge,
}) {
  const C = SECTOR_PALETTE;
  return (
    <svg viewBox="0 0 600 600" fill="none" className={styles.svg} aria-hidden="true">
      <circle cx={CX} cy={CY} r="90" fill={C.dark} className={styles.center} />
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff"
        fontFamily="'Inter', sans-serif"
        fontSize="16"
        fontWeight="300"
        letterSpacing="4"
      >
        SECTORS
      </text>
      <text
        x={CX}
        y={CY + 20}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff"
        fontFamily="'Inter', sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="2"
      >
        WE SERVE
      </text>

      <g ref={ringRef}>
        {SEGMENTS.map((seg, i) => (
          <path
            key={i}
            ref={(el) => { segRefs.current[i] = el; }}
            d={segArc(CX, CY, RM, seg.start, seg.end)}
            stroke={i === 0 ? C.yellow : C.inactive}
            strokeWidth={STROKE_W}
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </g>

      <circle ref={endpointRef} cx="0" cy={initBadge.y} r="0" opacity="0" fill={C.dark} />

      <g
        ref={badgeGroupRef}
        className={styles.orbit}
        transform={`translate(${initBadge.x} ${initBadge.y})`}
      >
        <circle cx="0" cy="0" r={BR} fill="#fff" />
        <text
          ref={numberRef}
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fill={C.dark}
          fontFamily="'Inter', sans-serif"
          fontSize="14"
          fontWeight="600"
        >
          01
        </text>
      </g>
    </svg>
  );
}
