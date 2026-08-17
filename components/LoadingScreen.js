'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const metrics = [
  { value: 89, suffix: '%', label: 'Project Efficiency' },
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 140, suffix: '+', label: 'Expert Team' },
];

export default function LoadingScreen({ onFinish, quick = false }) {
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const metricRefs = useRef([]);

  useEffect(() => {
    const d = (v) => (quick ? Math.max(180, Math.round(v * 0.38)) : v);
    const tl = anime.timeline({
      complete: () => {
        setTimeout(() => {
          screenRef.current?.classList.add('hidden');
          if (onFinish) setTimeout(onFinish, quick ? 300 : 800);
        }, quick ? 250 : 400);
      },
    });

    tl.add({
      targets: logoRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: d(800),
      easing: 'easeOutElastic(1, 0.6)',
    })
    .add({
      targets: metricRefs.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: d(600),
      easing: 'easeOutExpo',
      delay: anime.stagger(quick ? 80 : 200),
    }, '-=200')
    .add({
      targets: '.loading-metric-value-inner',
      innerHTML: function(el) {
        var target = parseInt(el.getAttribute('data-target'));
        return [0, target];
      },
      duration: d(1200),
      easing: 'easeOutCubic',
      round: 1,
      delay: anime.stagger(quick ? 40 : 100),
    }, '-=400')
    .add({
      targets: barRef.current,
      width: ['0%', '100%'],
      duration: d(1200),
      easing: 'easeInOutQuad',
    }, '-=800')
    .add({
      targets: pctRef.current,
      innerHTML: ['0%', '100%'],
      duration: d(1200),
      easing: 'easeInOutQuad',
      round: 1,
    }, '-=1200');

    return () => tl.pause();
  }, [onFinish, quick]);

  return (
    <div className="loading-screen" ref={screenRef}>
      <div className="loading-content">
        <div className="loading-logo" ref={logoRef}>
          <img src="/images/ihac-logo.png" alt="IHAC" style={{ height: 117, width: 'auto', marginBottom: 8 }} />
          <div className="loading-heading">Innovative Horizon Arabia Company</div>
        </div>

        <div className="loading-metrics">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="loading-metric"
              ref={(el) => { metricRefs.current[i] = el; }}
            >
              <span className="loading-metric-value">
                <span
                  className="loading-metric-value-inner"
                  data-target={m.value}
                >
                  0
                </span>
                {m.suffix}
              </span>
              <span className="loading-metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="loading-bar">
          <div className="loading-bar-fill" ref={barRef} />
        </div>
        <div className="loading-percentage" ref={pctRef}>0%</div>
      </div>
    </div>
  );
}
