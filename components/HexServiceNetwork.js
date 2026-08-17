'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import anime from 'animejs';
import { resolveDivisionImage, HEX_IMAGE_POOL } from './hexImageSource';

const HEX_POSITIONS = [
  { x: 0, y: -110 },
  { x: -110, y: 0 },
  { x: 110, y: 0 },
  { x: 0, y: 110 },
];

const CONNECTIONS = [
  [0, 1], [0, 2],
  [1, 3], [2, 3],
];

const ICON_MAP = {
  Cpu: 'microchip',
  Wrench: 'wrench',
  HardHat: 'hard-hat',
  Palette: 'palette',
  Bolt: 'bolt',
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* -------- Visual-only: derive a muted border palette from the photo under each hexagon -------- */

function toHsl(rgb) {
  let [r, g, b] = rgb.map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}

function fromHsl(hsl) {
  const [h, s, l] = hsl;
  if (s === 0) {
    const v = l * 255;
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue2rgb(h + 1 / 3) * 255, hue2rgb(h) * 255, hue2rgb(h - 1 / 3) * 255];
}

/* Desaturate to <= 18% saturation and lift toward premium neutrals. */
function muted(samples) {
  if (!samples || !samples.length) return null;
  const avg = samples
    .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
    .map((v) => v / samples.length);
  const [h, s, l] = toHsl(avg);
  const clampedL = Math.min(Math.max(l, 0.45), 0.78);
  return fromHsl([h, Math.min(s, 0.18), clampedL]).map((v) => Math.round(v));
}

function luminance(rgb) {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/* Pure visual helper: reads the loaded photo, writes muted CSS variables on the node. */
function samplePalette(imgEl, nodeEl) {
  if (!imgEl || !nodeEl || !imgEl.naturalWidth) return;
  try {
    const w = 48;
    const h = 48;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(imgEl, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    const dark = [];
    const warm = [];
    const cool = [];
    const light = [];
    for (let y = 2; y < h - 2; y += 2) {
      for (let x = 2; x < w - 2; x += 2) {
        const i = (y * w + x) * 4;
        const c = [data[i], data[i + 1], data[i + 2]];
        const lum = luminance(c);
        if (lum < 80) dark.push(c);
        else if (lum > 175) light.push(c);
        else if (c[0] > c[2]) warm.push(c);
        else cool.push(c);
      }
    }
    const all = [...dark, ...warm, ...cool, ...light];
    const sorted = [...all].sort((a, b) => luminance(a) - luminance(b));
    const quart = Math.max(1, Math.floor(all.length / 4));
    const c1 = muted(dark.length ? dark : sorted.slice(0, quart));
    const c2 = muted(warm.length ? warm : sorted.slice(quart, quart * 2));
    const c3 = muted(cool.length ? cool : sorted.slice(quart * 2, quart * 3));
    const c4 = muted(light.length ? light : sorted.slice(quart * 3));
    const sheen = muted([...sorted.slice(-Math.max(2, quart)).map((c) => c.map((v) => Math.min(255, v * 1.15))), [240, 240, 240]]);
    nodeEl.style.setProperty('--frame-c1', `rgb(${c1.join(',')})`);
    nodeEl.style.setProperty('--frame-c2', `rgb(${c2.join(',')})`);
    nodeEl.style.setProperty('--frame-c3', `rgb(${c3.join(',')})`);
    nodeEl.style.setProperty('--frame-c4', `rgb(${c4.join(',')})`);
    nodeEl.style.setProperty('--frame-sheen', `rgb(${sheen.join(',')})`);
  } catch (e) {
    /* sampling is decorative — never break the network */
  }
}

export default function HexServiceNetwork({ divisions, activeIndex, onSelect }) {
  const networkRef = useRef(null);
  const svgRef = useRef(null);
  const hexRefs = useRef([]);
  const entranceDone = useRef(false);
  const connectorDone = useRef(false);

  const deterministic = useMemo(() =>
    divisions.map((d, i) => ({
      division: d,
      title: d.shortTitle,
      icon: ICON_MAP[d.icon] || 'industry',
      image: resolveDivisionImage(d, i),
    })),
  [divisions]);

  const [items, setItems] = useState(deterministic);

  useEffect(() => {
    const pool = shuffleArray(HEX_IMAGE_POOL);
    const raf = requestAnimationFrame(() => setItems(divisions.map((d, i) => ({
      division: d,
      title: d.shortTitle,
      icon: ICON_MAP[d.icon] || 'industry',
      image: resolveDivisionImage(d, i, pool),
    }))));
    return () => cancelAnimationFrame(raf);
  }, [divisions]);

  useEffect(() => {
    if (entranceDone.current || !networkRef.current) return;
    entranceDone.current = true;

    const els = hexRefs.current.filter(Boolean);
    gsap.fromTo(els,
      { opacity: 0, scale: 0.94, y: 18 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );
  }, []);

  useEffect(() => {
    if (connectorDone.current || !svgRef.current) return;
    connectorDone.current = true;

    const paths = svgRef.current.querySelectorAll('.hex-connector-path');
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 700,
      easing: 'easeOutQuad',
      delay: 600,
    });
  }, []);

  const handleSelect = useCallback((i) => {
    if (onSelect) onSelect(i);
  }, [onSelect]);

  const activeConnectors = useMemo(() => {
    if (activeIndex === null || activeIndex === undefined) return [];
    return CONNECTIONS.reduce((acc, [from, to], idx) => {
      if (from === activeIndex || to === activeIndex) acc.push(idx);
      return acc;
    }, []);
  }, [activeIndex]);

  const svgVw = 500;
  const svgVh = 480;
  const offsetX = svgVw / 2;
  const offsetY = svgVh / 2;

  return (
    <div className="hex-network hex-bounding-box" ref={networkRef}>
      <svg
        ref={svgRef}
        className="hex-connector-svg"
        viewBox={`0 0 ${svgVw} ${svgVh}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {CONNECTIONS.map(([from, to], i) => {
          const p1 = HEX_POSITIONS[from];
          const p2 = HEX_POSITIONS[to];
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          const isActiveConnector = activeConnectors.includes(i);
          return (
            <path
              key={i}
              className={`hex-connector-path${isActiveConnector ? ' hex-connector-path-active' : ''}`}
              d={`M${offsetX + p1.x},${offsetY + p1.y} Q${offsetX + mx},${offsetY + my - 15} ${offsetX + p2.x},${offsetY + p2.y}`}
              stroke="var(--emerald, #00a86b)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 3"
            />
          );
        })}
      </svg>

      {items.map((item, i) => {
        const pos = HEX_POSITIONS[i];
        const isActive = activeIndex === i;

        return (
          <motion.div
            key={i}
            ref={(el) => { hexRefs.current[i] = el; }}
            className={`hex-node${isActive ? ' hex-node-active' : ''}`}
            style={{
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: isActive ? 1.05 : 1,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.18, ease: 'easeOut', type: 'tween' },
            }}
            onClick={() => handleSelect(i)}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(i); } }}
          >
            <div className="hex-node-img-wrap">
              <img
                src={item.image}
                alt=""
                className="hex-node-img"
                loading="lazy"
                aria-hidden="true"
                onLoad={(e) => samplePalette(e.currentTarget, hexRefs.current[i])}
              />
              <div className="hex-node-img-overlay" />
            </div>
            <div className="hex-node-content">
              <i className={`hex-node-icon fas fa-${item.icon}`} />
              <span className="hex-node-title">{item.title}</span>
            </div>
            <span className="hex-node-number">0{i + 1}</span>
            {isActive && <div className="hex-node-glow" />}
          </motion.div>
        );
      })}
    </div>
  );
}
