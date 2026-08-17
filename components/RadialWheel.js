'use client';
import { memo, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import anime from 'animejs';

const CX = 200;
const CY = 200;
const HUB_R = 50;
const INNER_R = 50;
const OUTER_R = 148;
const ICON_R = 192;
const ICON_BADGE_SIZE = 50;
const ACTIVE_ICON_SCALE = 1.1;
const ACTIVE_ICON_LIFT = 20;
const HOVER_ICON_LIFT = 5;
const ROTATION_OFFSET = 2.5;
const WHEEL_STAGE_INSET = 'clamp(8px, 2%, 16px)';

const ICON_TUNING = {
  iso:               { xOffset: -20, yOffset: -14 },
  quality:           { xOffset: -6,  yOffset: -12 },
  delivery:          { xOffset: -12, yOffset: -18 },
  'problem-solving': { xOffset: -8,  yOffset: -2  },
  leadership:        { xOffset: 5,   yOffset: 3   },
  support:           { xOffset: -16, yOffset: -14 },
};

const GAP_DEG = 2.5;
const SLICE_COUNT = 7;
const ANGLE_PER = 360 / SLICE_COUNT;
const SLICE_ARC = ANGLE_PER - GAP_DEG;

const ACCENT = '#E8A73B';

const R4 = (v) => Math.round(v * 10000) / 10000;

const ICON_MAP = {
  award: 'fa-award',
  medal: 'fa-medal',
  comments: 'fa-comments',
  clock: 'fa-clock',
  headset: 'fa-headset',
  lightbulb: 'fa-lightbulb',
  'users-gear': 'fa-users-gear',
};


function polarToCartesian(r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: R4(CX + r * Math.cos(rad)), y: R4(CY + r * Math.sin(rad)) };
}

function toPct(v) {
  return `${R4((v / 400) * 100)}%`;
}

function createSlicePath(startAngle, endAngle) {
  const os = polarToCartesian(OUTER_R, startAngle);
  const oe = polarToCartesian(OUTER_R, endAngle);
  const ins = polarToCartesian(INNER_R, startAngle);
  const ine = polarToCartesian(INNER_R, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${os.x} ${os.y}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${large} 0 ${oe.x} ${oe.y}`,
    `L ${ine.x} ${ine.y}`,
    `A ${INNER_R} ${INNER_R} 0 ${large} 1 ${ins.x} ${ins.y}`,
    'Z',
  ].join(' ');
}

function RadialWheel({ capabilities, activeIndex, onSliceClick, onSliceHover, onSliceLeave, reducedMotion }) {
  const shouldReduce = useReducedMotion();
  const reduced = reducedMotion || shouldReduce;
  const hubRingRef = useRef(null);
  const wheelRef = useRef(null);
  const badgeRef = useRef(null);
  const [localHover, setLocalHover] = useState(-1);

  const sliceData = useMemo(() => {
    return capabilities.map((cap, i) => {
      const startAngle = R4(-90 + ROTATION_OFFSET + i * ANGLE_PER + GAP_DEG / 2);
      const endAngle = R4(startAngle + SLICE_ARC);
      const midAngle = R4((startAngle + endAngle) / 2);

      const tuning = ICON_TUNING[cap.id] || {};

      const iconPos = polarToCartesian(ICON_R, midAngle);
      const finalPos = {
        x: R4(iconPos.x + (tuning.xOffset || 0)),
        y: R4(iconPos.y + (tuning.yOffset || 0)),
      };

      const radialX = Math.cos((midAngle * Math.PI) / 180);
      const radialY = Math.sin((midAngle * Math.PI) / 180);
      const activeIconPos = {
        x: R4(finalPos.x + ACTIVE_ICON_LIFT * radialX),
        y: R4(finalPos.y + ACTIVE_ICON_LIFT * radialY),
      };
      const hoverIconPos = {
        x: R4(finalPos.x + HOVER_ICON_LIFT * radialX),
        y: R4(finalPos.y + HOVER_ICON_LIFT * radialY),
      };
      const lineStart = polarToCartesian(OUTER_R, midAngle);
      const activeLineStart = polarToCartesian(OUTER_R + ACTIVE_ICON_LIFT - 2, midAngle);
      const hoverLineStart = {
        x: R4(lineStart.x + HOVER_ICON_LIFT * radialX),
        y: R4(lineStart.y + HOVER_ICON_LIFT * radialY),
      };
      return {
        ...cap,
        startAngle,
        endAngle,
        midAngle,
        path: createSlicePath(startAngle, endAngle),
        iconPos: finalPos,
        activeIconPos,
        hoverIconPos,
        lineStart,
        activeLineStart,
        hoverLineStart,
        liftX: R4(28 * radialX),
        liftY: R4(28 * radialY),
        hoverLiftX: R4(8 * radialX),
        hoverLiftY: R4(8 * radialY),
        iconPctX: toPct(finalPos.x),
        iconPctY: toPct(finalPos.y),
        activeIconPctX: toPct(activeIconPos.x),
        activeIconPctY: toPct(activeIconPos.y),
        hoverIconPctX: toPct(hoverIconPos.x),
        hoverIconPctY: toPct(hoverIconPos.y),
      };
    });
  }, [capabilities]);

  useEffect(() => {
    if (reduced) return;
    const hubAnim = anime({
      targets: hubRingRef.current,
      rotate: [0, 360],
      duration: 28000,
      easing: 'linear',
      loop: true,
      autoplay: true,
    });
    const breathAnim = anime({
      targets: wheelRef.current,
      rotate: [0, 0.4, 0, -0.4, 0],
      duration: 10000,
      easing: 'easeInOutQuad',
      loop: true,
      autoplay: true,
    });
    const badgeBreath = anime({
      targets: badgeRef.current,
      scale: [1, 1.015, 1],
      duration: 4000,
      easing: 'easeInOutQuad',
      loop: true,
      autoplay: true,
    });
    return () => {
      hubAnim.pause();
      breathAnim.pause();
      badgeBreath.pause();
    };
  }, [reduced]);

  const handleMouseEnter = useCallback((i) => {
    setLocalHover(i);
    onSliceHover(i);
  }, [onSliceHover]);

  const handleMouseLeave = useCallback(() => {
    setLocalHover(-1);
    onSliceLeave();
  }, [onSliceLeave]);

  const noAnim = { duration: 0.01 };
  const activeTransition = { duration: 0.45, ease: 'easeOut' };
  const fastSpring = { type: 'spring', damping: 26, stiffness: 200, mass: 0.6 };
  const iconActiveTransition = { duration: 0.4, ease: 'easeOut' };

  return (
    <div
      className="radial-wheel"
      ref={wheelRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        maxWidth: 500,
        margin: '0 auto',
        overflow: 'visible',
        isolation: 'isolate',
      }}
    >
      <div style={{ position: 'absolute', inset: WHEEL_STAGE_INSET, overflow: 'visible' }}>
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ACCENT} />
            <stop offset="100%" stopColor="#d4902e" />
          </linearGradient>
          <filter id="slice-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
          </filter>
          <filter id="slice-glow">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="rgba(232,167,59,0.25)" />
          </filter>
          <filter id="badge-glow">
            <feDropShadow dx="0" dy="2" stdDeviation="8" floodColor="rgba(232,167,59,0.2)" />
          </filter>
          <filter id="icon-glow">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(232,167,59,0.3)" />
          </filter>
        </defs>

        {sliceData.map((s, i) => {
          const isActive = i === activeIndex;
          const isHovered = i === localHover;

          return (
            <motion.g
              key={s.id}
              style={{ cursor: 'pointer', transformOrigin: `${CX}px ${CY}px`, outline: 'none' }}
              animate={{
                x: isActive ? s.liftX : isHovered ? s.hoverLiftX : 0,
                y: isActive ? s.liftY : isHovered ? s.hoverLiftY : 0,
                scale: isActive ? 1.04 : isHovered ? 1.015 : 1,
                filter: isActive ? 'url(#slice-glow)' : isHovered ? 'url(#slice-shadow)' : 'none',
              }}
              transition={reduced ? noAnim : isActive ? activeTransition : fastSpring}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onSliceClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`${s.label}: ${s.description}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSliceClick(i); } }}
            >
              <path
                d={s.path}
                fill={isActive ? 'url(#active-grad)' : isHovered ? '#e8edf4' : '#f0f4f8'}
                stroke={isActive ? 'none' : 'rgba(0,0,0,0.07)'}
                strokeWidth={isActive ? 0 : 1.5}
                strokeLinejoin="round"
              />
            </motion.g>
          );
        })}

        <motion.circle
          cx={CX} cy={CY} r={HUB_R}
          fill="#fff"
          stroke="none"
          filter="url(#badge-glow)"
          animate={{ scale: 1 }}
        />

        <g ref={hubRingRef} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle
            cx={CX} cy={CY} r={HUB_R - 4}
            fill="none"
            stroke={`${ACCENT}20`}
            strokeWidth={1.5}
            strokeDasharray="4 6"
          />
          <circle
            cx={CX} cy={CY} r={HUB_R - 10}
            fill="none"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={1}
          />
        </g>

      </svg>

      {sliceData.map((s, i) => {
        const isActive = i === activeIndex;
        const isHovered = i === localHover;

        return (
          <motion.div
            key={`icon-${s.id}`}
            style={{
              position: 'absolute',
              left: s.iconPctX,
              top: s.iconPctY,
              transform: 'translate(-50%, -50%)',
              width: ICON_BADGE_SIZE,
              height: ICON_BADGE_SIZE,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              outline: 'none',
            }}
            animate={{
              left: isActive ? s.activeIconPctX : isHovered ? s.hoverIconPctX : s.iconPctX,
              top: isActive ? s.activeIconPctY : isHovered ? s.hoverIconPctY : s.iconPctY,
              scale: isActive ? ACTIVE_ICON_SCALE : isHovered ? 1.04 : 1,
              opacity: isActive ? 1 : isHovered ? 0.9 : 0.72,
              backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.88)',
              boxShadow: isActive
                ? '0 4px 16px rgba(0,0,0,0.08), 0 0 0 2px rgba(232,167,59,0.2)'
                : isHovered
                  ? '0 4px 14px rgba(0,0,0,0.06)'
                  : '0 2px 8px rgba(0,0,0,0.04)',
              color: isActive ? ACCENT : '#8892a0',
            }}
            transition={reduced ? noAnim : iconActiveTransition}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSliceClick(i)}
            role="button"
            tabIndex={-1}
            aria-hidden="true"
          >
            <i className={`fas ${ICON_MAP[s.icon] || 'fa-circle'}`} style={{ fontSize: '1.2rem' }} />
          </motion.div>
        );
      })}

      <motion.div
        ref={badgeRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 78,
          height: 78,
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          zIndex: 10,
          pointerEvents: 'none',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06), 0 2px 16px rgba(232,167,59,0.15)',
          border: '1px solid rgba(232,167,59,0.1)',
        }}
        animate={{ scale: 1 }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: ACCENT, letterSpacing: '1.5px', lineHeight: 1.2 }}>IHAC</span>
        <span style={{ fontSize: '0.5rem', fontWeight: 500, color: '#888', letterSpacing: '0.5px', marginTop: 2 }}>CORE</span>
      </motion.div>
      </div>
    </div>
  );
}

export default memo(RadialWheel);
