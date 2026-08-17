'use client';
import { createElement } from 'react';
import { LocateFixed, DraftingCompass, Verified } from 'lucide-react';
import styles from './AboutIHAC.module.css';

const R_OUT = 90;
const R_IN = 84;

function hexPts(R) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (-90 + 60 * i);
    pts.push(`${(100 + R * Math.cos(a)).toFixed(2)},${(100 + R * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

/* Premium line icons from the existing lucide library (already bundled on the
   About page). Geometry is rendered inside the shared 200-unit viewBox so the
   anime.js power-on draw choreography ([data-hex-icon] stroke parts) and the
   section's icon language keep working unchanged. */
const ICON_MAP = {
  target: LocateFixed,
  telescope: DraftingCompass,
  shield: Verified,
};

/* 24-unit lucide box scaled up so the glyph occupies ~65-70% of the hexagon interior */
const ICON_SCALE = 5.2;
const ICON_STROKE = 0.6;

function lineIconNode(Icon) {
  const el = typeof Icon.render === 'function' ? Icon.render({}, null) : null;
  return (el && el.props && el.props.iconNode) || [];
}

function LineIcon({ type }) {
  const Icon = ICON_MAP[type];
  if (!Icon) return null;
  const off = 100 - 12 * ICON_SCALE;
  return (
    <g
      transform={`translate(${off} ${off}) scale(${ICON_SCALE})`}
      fill="none"
      strokeWidth={ICON_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {lineIconNode(Icon).map(([tag, attrs], i) =>
        createElement(tag, {
          ...attrs,
          key: i,
          'data-hex-icon': 'true',
          'data-part-type': 'stroke',
        })
      )}
    </g>
  );
}

export default function HexagonIcon({ module }) {
  const { outline, iconColor, icon, title } = module;
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      focusable="false"
      role="img"
      aria-label={`${title} icon`}
    >
      <polygon
        className={styles.hexFrame}
        points={hexPts(R_OUT)}
        fill="var(--frameFill)"
        stroke="rgba(0,0,0,0.07)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        className={styles.hexFill}
        points={hexPts(R_IN)}
        fill="rgba(255,255,255,0)"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        className={styles.hexOutline}
        points={hexPts(R_IN)}
        fill="none"
        stroke={outline}
        strokeWidth="3"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
      <g
        className={styles.icon}
        fill="none"
        stroke={iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <LineIcon type={icon} />
      </g>
    </svg>
  );
}
