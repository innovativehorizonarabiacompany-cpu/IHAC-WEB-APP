'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { CheckCircle2 } from 'lucide-react';

export default function FormSuccess({ message = 'Your message has been sent and our team will review it.' }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const icon = card.querySelector('.ct-success-icon-wrap');
    const ring = card.querySelector('.ct-success-ring');
    const title = card.querySelector('h3');
    const words = [...card.querySelectorAll('.ct-success-word')];

    const tl = anime.timeline({ easing: 'easeOutExpo' });
    tl.add({ targets: card, opacity: [0, 1], scale: [0.92, 1], duration: 380 })
      .add({ targets: ring, scale: [0.4, 1.3], opacity: [0.75, 0], duration: 800, easing: 'easeOutCubic' }, 140)
      .add({ targets: icon, scale: [0.2, 1.15, 1], rotate: [-30, 6, 0], duration: 750, easing: 'easeOutBack' }, 120)
      .add({ targets: ring, scale: [0.55, 1.45], opacity: [0.6, 0], duration: 750, easing: 'easeOutCubic' }, 260)
      .add({ targets: title, translateY: [26, 0], opacity: [0, 1], duration: 520 }, '-=420')
      .add({ targets: words, translateY: [14, 0], opacity: [0, 1], duration: 460, delay: anime.stagger(30) }, '-=300');

    return () => tl.pause();
  }, []);

  return (
    <div className="ct-form-success" style={{ opacity: 0, transform: 'scale(0.92)', maxWidth: 600, margin: '0 auto' }} ref={cardRef}>
      <div className="ct-success-icon-wrap">
        <span className="ct-success-ring" />
        <CheckCircle2 size={80} strokeWidth={1.25} color="#10b981" />
      </div>
      <h3>Message Sent!</h3>
      <p>
        {message.split(' ').map((w, i) => (
          <span key={i} className="ct-success-word" style={{ display: 'inline-block', opacity: 0 }}>{w}&nbsp;</span>
        ))}
      </p>
    </div>
  );
}
