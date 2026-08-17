import anime from 'animejs';
import { MODULES } from './aboutData';

const EASE_DRAW = 'easeInOutCubic';
const JUNCTION_X = [200, 600, 1000];

function dashLen(el) {
  return el ? el.getTotalLength() : 0;
}

function prepDraw(el) {
  if (!el) return;
  const len = dashLen(el);
  el.style.strokeDasharray = len;
  el.style.strokeDashoffset = len;
}

function clearDraw(el) {
  if (!el) return;
  el.style.strokeDasharray = '';
  el.style.strokeDashoffset = '';
}

/**
 * Resolve every animated element from the section DOM at call time.
 * Never depends on React refs — the section element is captured once
 * and queried via CSS module class names.
 */
function collectTargets(scope, styles) {
  const nodeEls = [...scope.querySelectorAll(`.${styles.node}`)];
  return {
    connections: [...scope.querySelectorAll(`.${styles.connPath}`)],
    junctions: [...scope.querySelectorAll(`.${styles.junction}`)],
    connTicks: [...scope.querySelectorAll(`.${styles.connTick}`)],
    signal: scope.querySelector(`.${styles.signal}`),
    nodes: nodeEls.map((nodeEl, i) => {
      const iconEl = nodeEl.querySelector(`.${styles.icon}`);
      const gearEl = nodeEl.querySelector(`[data-gear]`);
      if (iconEl) iconEl.style.transformOrigin = '100px 100px';
      if (gearEl) gearEl.style.transformOrigin = '100px 103px';
      return {
        el: nodeEl,
        id: MODULES[i] ? MODULES[i].id : null,
        hexOutline: nodeEl.querySelector(`.${styles.hexOutline}`),
        hexFill: nodeEl.querySelector(`.${styles.hexFill}`),
        icon: iconEl,
        gear: gearEl,
        iconParts: [...nodeEl.querySelectorAll(`[data-hex-icon]`)].map((el) => ({
          el,
          isStroke: (el.getAttribute('data-part-type') || 'stroke') === 'stroke',
        })),
        number: nodeEl.querySelector(`.${styles.number}`),
        title: nodeEl.querySelector(`.${styles.title}`),
        card: nodeEl.querySelector(`.${styles.cardBody}`),
        words: [...nodeEl.querySelectorAll(`.${styles.word}`)],
        checkRows: [...nodeEl.querySelectorAll(`.${styles.checkRow}`)],
        checkTicks: [...nodeEl.querySelectorAll(`.${styles.hexTick}`)],
        checkDividers: [...nodeEl.querySelectorAll(`.${styles.checkDivider}`)],
        fillColor: MODULES[i] ? MODULES[i].color : '#171717',
      };
    }),
  };
}

/** Gear tick flash used when the signal pulse passes a junction. */
function flashJunction(el) {
  anime({
    targets: el,
    scale: [1, 1.9, 1],
    fill: ['#171717', '#FFD400', '#171717'],
    duration: 340,
    easing: 'easeOutQuad',
  });
}

/**
 * Ambient: junction nodes pulse softly on a slow cycle.
 */
function startAmbient(junctions) {
  if (!junctions || !junctions.length) return;
  anime({
    targets: junctions,
    opacity: [0.55, 1],
    duration: 7000,
    delay: anime.stagger(1400),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
  });
}

/**
 * Signal pulse: a gold node travels along the bus line every 11s,
 * flashing the junction it passes (electrical current feel).
 */
function startSignalLoop(signal, junctions) {
  if (!signal) return;
  const JX = [...JUNCTION_X];
  const state = { value: 130 };
  let passed = new Set();
  let paused = false;

  const onVisibility = () => {
    const hidden = document.hidden;
    if (hidden && !paused) {
      paused = true;
      anime.remove(state);
      signal.setAttribute('opacity', 0);
    } else if (!hidden && paused) {
      paused = false;
      signal.setAttribute('opacity', 1);
      state.value = 130;
      passed.clear();
      travel();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  function travel() {
    if (paused) return;
    anime({
      targets: state,
      value: 1070,
      duration: 1500,
      easing: 'easeInOutSine',
      update: () => {
        const x = state.value;
        signal.setAttribute('cx', x);
        JX.forEach((jx, i) => {
          if (!passed.has(i) && Math.abs(x - jx) < 14) {
            passed.add(i);
            if (junctions && junctions[i]) flashJunction(junctions[i]);
          }
        });
      },
      complete: () => {
        passed.clear();
        setTimeout(() => {
          if (!paused) {
            state.value = 130;
            travel();
          }
        }, 10500);
      },
    });
  }

  signal.setAttribute('opacity', 1);
  travel();
}

/**
 * Power-on choreography: connection network draws first, then each module
 * activates in sequence with module-specific icon assembly:
 *  mission: hex outline -> yellow fill expands -> target assembles -> pulse
 *  vision:  telescope assembles path-by-path -> hex fill -> title
 *  values:  shield outline draws -> gear rotates once -> checklist stagger
 * After the reveal, the signal loop and ambient motion take over.
 */
export function runPowerOn(scope, styles) {
  if (!scope) return;
  const api = collectTargets(scope, styles);

  const tl = anime.timeline({
    autoplay: false,
    complete: () => {
      // Release inline transforms so CSS hover states own the icons and dividers.
      api.nodes.forEach((n) => {
        if (!n) return;
        if (n.icon) n.icon.style.transform = '';
        if (n.checkDividers) n.checkDividers.forEach((el) => { el.style.transform = ''; });
      });
      startAmbient(api.junctions);
      startSignalLoop(api.signal, api.junctions);
    },
  });

  const conns = api.connections.filter(Boolean);
  conns.forEach(prepDraw);
  tl.add(
    {
      targets: conns,
      strokeDashoffset: 0,
      duration: 1500,
      easing: EASE_DRAW,
      delay: anime.stagger(70),
    },
    0
  );

  const junctions = api.junctions.filter(Boolean);
  junctions.forEach((el) => anime.set(el, { scale: 0, opacity: 0 }));
  tl.add(
    {
      targets: junctions,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 450,
      easing: 'easeOutBack',
      delay: anime.stagger(90),
    },
    1500
  );

  // Calibration markers fade in sequentially after the bus draws.
  const connTicks = api.connTicks.filter(Boolean);
  connTicks.forEach((el) => anime.set(el, { opacity: 0 }));
  tl.add(
    {
      targets: connTicks,
      opacity: [0, 1],
      duration: 550,
      easing: 'easeOutQuad',
      delay: anime.stagger(90),
    },
    1000
  );

  api.nodes.filter(Boolean).forEach((n) => {
    const o = 780 * api.nodes.indexOf(n);

    if (n.hexOutline) {
      prepDraw(n.hexOutline);
      tl.add(
        { targets: n.hexOutline, strokeDashoffset: 0, duration: 900, easing: EASE_DRAW },
        o + 120
      );
    }

    if (n.number) {
      tl.add(
        {
          targets: n.number,
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutQuad',
          clearProps: 'transform',
        },
        o + 140
      );
    }

    const isVision = n.id === 'vision';

    if (n.hexFill && !isVision) {
      tl.add(
        {
          targets: n.hexFill,
          fill: ['rgba(255,255,255,0)', n.fillColor],
          scale: [0.72, 1],
          duration: 550,
          easing: 'easeOutQuad',
        },
        o + 260
      );
    } else if (n.hexFill && isVision) {
      // Vision: black fill wipes upward beneath the telescope.
      anime.set(n.hexFill, { fill: n.fillColor, clipPath: 'inset(0 0 100% 0)' });
      tl.add(
        {
          targets: n.hexFill,
          clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
          duration: 700,
          easing: 'easeInOutCubic',
        },
        o + 320
      );
    }

    if (n.iconParts && n.iconParts.length) {
      n.iconParts.forEach((p) => {
        if (p.isStroke) {
          prepDraw(p.el);
          anime.set(p.el, { opacity: 0 });
        } else {
          anime.set(p.el, { scale: 0, opacity: 0 });
        }
      });

      const strokeParts = n.iconParts.filter((p) => p.isStroke);
      const solidParts = n.iconParts.filter((p) => !p.isStroke);

      if (n.id === 'values') {
        // Values: shield outline draws, then the gear assembles and rotates once.
        const gearParts = strokeParts.filter((p) => p.el.closest('[data-gear]'));
        const shieldParts = strokeParts.filter((p) => !p.el.closest('[data-gear]'));
        tl.add(
          {
            targets: shieldParts.map((p) => p.el),
            strokeDashoffset: 0,
            opacity: [0, 1],
            duration: 520,
            easing: EASE_DRAW,
          },
          o + 380
        );
        if (gearParts.length) {
          tl.add(
            {
              targets: gearParts.map((p) => p.el),
              strokeDashoffset: 0,
              opacity: [0, 1],
              duration: 420,
              easing: EASE_DRAW,
            },
            o + 480
          );
        }
        if (n.gear) {
          tl.add(
            {
              targets: n.gear,
              rotate: 360,
              duration: 950,
              easing: 'easeInOutQuad',
            },
            o + 480
          );
        }
        if (solidParts.length) {
          tl.add(
            {
              targets: solidParts.map((p) => p.el),
              scale: [0, 1],
              opacity: [0, 1],
              duration: 380,
              easing: 'easeOutBack',
            },
            o + 520
          );
        }
      } else {
        // Mission / Vision: strokes draw together, then the icon settles.
        tl.add(
          {
            targets: strokeParts.map((p) => p.el),
            strokeDashoffset: 0,
            opacity: [0, 1],
            duration: 420,
            easing: EASE_DRAW,
          },
          o + 560
        );
        tl.add(
          {
            targets: n.icon,
            scale: [1, 1.05, 1],
            duration: 340,
            easing: 'easeInOutQuad',
            clearProps: 'transform',
          },
          o + 640
        );
      }

      // Fill flash: the module hexagon brightens once after the icon settles.
      if (n.hexFill && n.id !== 'vision') {
        tl.add(
          {
            targets: n.hexFill,
            opacity: [0.55, 1],
            duration: 380,
            easing: 'easeOutQuad',
          },
          o + 700
        );
      }
    }

    if (n.title) {
      tl.add(
        {
          targets: n.title,
          translateY: [24, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutQuad',
          clearProps: 'transform',
        },
        o + 520
      );
    }

    if (n.el) {
      // Glow activates after the icon assembles, before the content box draws.
      tl.add(
        {
          targets: n.el,
          translateX: 0,
          duration: 1,
          complete: () => n.el.classList.add(styles.glowOn),
        },
        o + 660
      );
    }

    if (n.card) {
      tl.add(
        {
          targets: n.card,
          translateY: [12, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutQuad',
          clearProps: 'transform',
        },
        o + 650
      );
    }

    if (n.id === 'values' && n.checkRows && n.checkRows.length) {
      n.checkRows.forEach((el) => anime.set(el, { opacity: 0, translateX: -8 }));
      n.checkTicks.forEach((el) => anime.set(el, { scale: 0 }));
      n.checkDividers.forEach((el) => anime.set(el, { scaleX: 0 }));
      tl.add(
        {
          targets: n.checkRows,
          opacity: [0, 1],
          translateX: [8, 0],
          duration: 420,
          easing: 'easeOutQuad',
          delay: anime.stagger(120),
        },
        o + 740
      );
      tl.add(
        {
          targets: n.checkTicks,
          keyframes: [{ scale: 0 }, { scale: 1.35 }, { scale: 1 }],
          duration: 600,
          easing: 'easeOutQuad',
          delay: anime.stagger(120),
        },
        o + 740
      );
      tl.add(
        {
          targets: n.checkDividers,
          scaleX: [0, 1],
          duration: 380,
          easing: 'easeOutQuad',
          delay: anime.stagger(120),
        },
        o + 860
      );
    } else if (n.words && n.words.length) {
      tl.add(
        {
          targets: n.words,
          translateY: [16, 0],
          duration: 520,
          easing: 'easeOutQuad',
          delay: anime.stagger(40),
        },
        o + 740
      );
    }
  });

  tl.play();
}

/**
 * Reduced-motion path: jump every animated element to its final state.
 */
export function setFinalState(scope, styles) {
  if (!scope) return;
  const api = collectTargets(scope, styles);
  api.connections.forEach(clearDraw);
  api.junctions.forEach((el) => anime.set(el, { scale: 1, opacity: 1 }));
  api.connTicks.forEach((el) => anime.set(el, { opacity: 1 }));
  if (api.signal) api.signal.setAttribute('opacity', 0);
  api.nodes.forEach((n) => {
    if (!n) return;
    clearDraw(n.hexOutline);
    if (n.hexFill) {
      anime.set(n.hexFill, { fill: n.fillColor, scale: 1 });
      n.hexFill.style.clipPath = 'none';
    }
    n.iconParts.forEach((p) => {
      clearDraw(p.el);
      anime.set(p.el, { opacity: 1, scale: 1 });
    });
    if (n.icon) anime.set(n.icon, { opacity: 1, rotate: 0, scale: 1 });
    if (n.gear) anime.set(n.gear, { rotate: 0 });
    [
      ['number', { translateY: 0, opacity: 1 }],
      ['title', { translateY: 0, opacity: 1 }],
      ['card', { translateY: 0, opacity: 1 }],
    ].forEach(([k, v]) => {
      if (n[k]) anime.set(n[k], v);
    });
    n.words.forEach((el) => anime.set(el, { translateY: 0, opacity: 1 }));
    n.checkRows.forEach((el) => anime.set(el, { translateX: 0, opacity: 1 }));
    n.checkTicks.forEach((el) => anime.set(el, { scale: 1, opacity: 1 }));
    n.checkDividers.forEach((el) => anime.set(el, { scaleX: 1 }));
    if (n.el) n.el.classList.add(styles.glowOn);
  });
}
