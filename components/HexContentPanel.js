'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import anime from 'animejs';
import { resolveDivisionImage, HEX_IMAGE_POOL } from './hexImageSource';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CREATIVE_POOL = [
  '/images/event_management/cinematic_lights_picture.png',
  '/images/event_management/high_profile_guests.png',
  '/images/event_management/event_exterior.png',
  '/images/event_management/international_PX_confress - Copy.png',
  '/images/event_management/interior_shot_with_guest - Copy.png',
  '/images/event_management/event_interior_high_profile - Copy.png',
  '/images/event_management/EDUCATION_AND_COMMUNITY_EVENT.png',
  '/images/event_management/person_speaking.png',
  '/images/event_management/venue_arrangement_shot_2.png',
  '/images/event_management/cinematic_picture_of_table.png',
];

export default function HexContentPanel({ division, index }) {
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const anchorRef = useRef(null);
  const listRef = useRef(null);
  const ctaRef = useRef(null);

  const deterministic = useMemo(() =>
    resolveDivisionImage(division, index),
  [index, division.icon, division.images]);

  const [imageSrc, setImageSrc] = useState(deterministic);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (division.icon === 'Cpu' || (division.images && division.images.length)) {
        setImageSrc(resolveDivisionImage(division, index));
      } else {
        const isCreative = division.icon === 'Palette';
        const pool = shuffleArray(HEX_IMAGE_POOL);
        const creativePool = isCreative ? shuffleArray(CREATIVE_POOL) : undefined;
        setImageSrc(resolveDivisionImage(division, index, pool, creativePool));
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [index, division.icon, division.images]);

  useEffect(() => {
    const number = numberRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const anchor = anchorRef.current;
    const items = listRef.current ? listRef.current.querySelectorAll('li') : [];
    const cta = ctaRef.current;

    const tl = anime.timeline({ easing: 'easeOutQuad' });

    if (number) {
      tl.add({
        targets: number,
        translateY: [24, 0],
        opacity: [0, 1],
        duration: 450,
      });
    }

    if (title) {
      tl.add({
        targets: title,
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 350,
      }, '-=50');
    }

    if (subtitle) {
      tl.add({
        targets: subtitle,
        opacity: [0, 1],
        duration: 250,
      }, '-=50');
    }

    if (anchor) {
      tl.add({
        targets: anchor,
        scaleX: [0, 1],
        opacity: [0, 1],
        transformOrigin: '0px 50%',
        duration: 400,
      }, '-=100');
    }

    if (items.length) {
      tl.add({
        targets: items,
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 200,
        delay: (el, i) => i * 50,
      }, '-=100');
    }

    if (cta) {
      tl.add({
        targets: cta,
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 200,
      }, '-=80');
    }

    return () => { tl.pause(); };
  }, [index]);

  return (
    <>
      <div className="hex-col-image">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="hex-image-frame"
        >
          <img
            src={imageSrc}
            alt={division.title}
            className="hex-display-img"
            loading="lazy"
          />
          <div className="hex-img-emerald-overlay" />
        </motion.div>
      </div>

      <div className="hex-col-text">
        <div className="content-panel-header">
          <div className="content-panel-number" ref={numberRef}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="content-panel-title" ref={titleRef}>{division.title}</h3>
          <p className="content-panel-subtitle" ref={subtitleRef}>{division.summary}</p>
          <div className="content-panel-anchor" ref={anchorRef} />
        </div>
        <ul className="hex-info-list" ref={listRef}>
          {division.capabilities.slice(0, 3).map((c, i) => (
            <li key={i}>{c.title}</li>
          ))}
        </ul>
        <div ref={ctaRef}>
          <Link
            href={division.link || '/solutions/' + division.id}
            className="hex-info-cta"
          >
            Learn More <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </>
  );
}
