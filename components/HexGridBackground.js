'use client';
import { useEffect, useRef } from 'react';

export default function HexGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w, h, animId, particles = [];
    let mouse = { x: -999, y: -999 };

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = Math.min(20, Math.round((w * h) / 30000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function drawHexGrid() {
      const size = 60;
      const hexH = size * Math.sqrt(3);
      const hexW = size * 2;
      const cols = Math.ceil(w / (hexW * 0.75)) + 1;
      const rows = Math.ceil(h / hexH) + 1;

      ctx.strokeStyle = 'var(--emerald, #00a86b)';
      ctx.globalAlpha = 0.03;
      ctx.lineWidth = 0.5;

      for (let row = 0; row < rows; row++) {
        const offset = row % 2 === 0 ? 0 : hexW * 0.375;
        for (let col = 0; col < cols; col++) {
          const cx = col * hexW * 0.75 + offset;
          const cy = row * hexH * 0.5 + size;
          if (cx < -hexW || cx > w + hexW || cy < -hexH || cy > h + hexH) continue;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i - Math.PI / 6;
            const px = cx + size * Math.cos(angle);
            const py = cy + size * Math.sin(angle);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    function drawConnectionLines() {
      ctx.strokeStyle = 'var(--emerald, #00a86b)';
      ctx.globalAlpha = 0.03;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    function drawParticles() {
      for (const p of particles) {
        ctx.fillStyle = 'var(--emerald, #00a86b)';
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = 'var(--emerald, #00a86b)';
          ctx.globalAlpha = 0.06;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      drawHexGrid();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }
      drawConnectionLines();
      drawParticles();
      animId = requestAnimationFrame(animate);
    }

    function onMouse(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hex-bg-canvas"
    />
  );
}
