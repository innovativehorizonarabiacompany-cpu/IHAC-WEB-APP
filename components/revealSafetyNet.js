export function revealSafetyNet(elements, timeout = 2000) {
  const t = setTimeout(() => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    elements.forEach((el) => {
      if (!el) return;
      if (parseFloat(getComputedStyle(el).opacity || '1') > 0.01) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, timeout);
  return () => clearTimeout(t);
}