'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { industriesData } from '@/data/siteData';

const DURATION = 5000;
const items = industriesData;

const GRADIENTS = [
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(27,79,114,0.7) 50%, rgba(27,79,114,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(0,80,60,0.7) 50%, rgba(0,80,60,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(0,90,100,0.7) 50%, rgba(0,90,100,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(100,30,30,0.7) 50%, rgba(100,30,30,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(0,60,100,0.7) 50%, rgba(0,60,100,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(60,60,60,0.7) 50%, rgba(60,60,60,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(100,60,0,0.7) 50%, rgba(100,60,0,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(160,70,0,0.7) 50%, rgba(160,70,0,0.15))',
  'linear-gradient(to top, rgba(15,23,42,0.95), rgba(50,50,80,0.7) 50%, rgba(50,50,80,0.15))',
];

const IMAGES = [
  'Oil & Gas.jpg',
  'petrochemcial.jpeg',
  'Water and Wastewater.jpg',
  'Manufacturing.png',
  'Comercial.jpeg',
  'Infrastructure.jpeg',
  'Warehouse.jpeg',
  'Food & Beverage.png',
  'Retail & Brand Environments.jpg',
];

function iconClass(icon) {
  const m = { OilWell: 'oil-well', Flask: 'flask', Water: 'water', Utensils: 'utensils', Industry: 'industry', Building: 'building', Road: 'road', Warehouse: 'warehouse', PartyPopper: 'champagne-glasses' };
  return m[icon] || 'industry';
}

export default function IndustriesAccordion() {
  const [active, setActive] = useState(0);
  const barRefs = useRef([]);
  const timerRef = useRef(null);

  const next = () => setActive(p => (p + 1) % items.length);

  const goTo = i => {
    if (i === active) return;
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, DURATION);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, DURATION);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const el = barRefs.current[active];
    if (!el) return;
    anime.remove(el);
    el.style.width = '0%';
    anime({ targets: el, width: '100%', duration: DURATION, easing: 'easeInOutSine' });
  }, [active]);

  return (
    <div className="ia-track">
      {items.map((ind, i) => (
        <div
          key={i}
          className={'ia-card' + (i === active ? ' ia-active' : '')}
          onClick={() => goTo(i)}
        >
          <div className="ia-bg" style={{ backgroundImage: `url(/images/${encodeURIComponent(IMAGES[i])})` }}>
            <div className={'ia-overlay' + (i === active ? ' ia-overlay-active' : ' ia-overlay-dim')}
                 style={i === active ? { background: GRADIENTS[i] } : {}} />
          </div>
          <div className="ia-top-line">
            <div className="ia-progress" ref={el => barRefs.current[i] = el} />
          </div>
          <div className={'ia-btn' + (i === active ? ' ia-show' : '')}>
            <Link href="/industries">LEARN MORE <i className="fas fa-arrow-right" /></Link>
          </div>
          <div className={'ia-body' + (i === active ? ' ia-show' : '')}>
            <i className={'fas fa-' + iconClass(ind.icon)} />
            <h3>{ind.name}</h3>
            <p>{ind.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
