'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (!stored && prefersDark);
    if (initial) document.documentElement.setAttribute('data-theme', 'dark');
    return initial;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <i className={'fas ' + (dark ? 'fa-sun' : 'fa-moon')} suppressHydrationWarning />
    </button>
  );
}
