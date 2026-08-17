'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800', '900'] });
import { motion } from 'framer-motion';
import { Medal, MessagesSquare, Clock, Headset, Lightbulb } from 'lucide-react';
import { siteConfig, whyUs, faqData, downloadsData } from '@/data/siteData';

import IndustriesAccordion from '@/components/IndustriesAccordion';
import ParticleBackground from '@/components/ParticleBackground';
import ProjectCoverflow from '@/components/ProjectCoverflow';
import HexCarousel from '@/components/HexCarousel';
import { revealSafetyNet } from '@/components/revealSafetyNet';

function SectionHeader({ tag, title, text }) {
  return (
    <div className="section-header">
      {tag && <span className="section-tag">{tag}</span>}
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {text && <p>{text}</p>}
    </div>
  );
}

function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    const net = revealSafetyNet([el]);
    return () => { observer.disconnect(); net(); };
  }, []);
  return <div ref={ref} className={'reveal ' + className} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>{children}</div>;
}

function MetricCounter({ target, suffix = '', label }) {
  const numRef = useRef(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const numEl = numRef.current;
    const wrapper = wrapperRef.current;
    if (!numEl || !wrapper) return;
    let timer = null;
    const animate = () => {
      numEl.textContent = '0';
      if (timer) clearInterval(timer);
      const steps = 40;
      let step = 0;
      timer = setInterval(() => {
        step++;
        const p = Math.min(step / steps, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        numEl.textContent = Math.round(eased * target);
        if (p >= 1) clearInterval(timer);
      }, 35);
    };
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) animate();
        else { numEl.textContent = '0'; if (timer) clearInterval(timer); }
      },
      { threshold: 0.3 }
    );
    observer.observe(wrapper);
    return () => { observer.disconnect(); if (timer) clearInterval(timer); };
  }, [target]);
  return (
    <div className="stat-item" ref={wrapperRef}>
      <div><span className="stat-num" ref={numRef}>0</span><span className="stat-plus">{suffix}</span></div>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function HomePageClient({ initialProjects = [] }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [downSubmitted, setDownSubmitted] = useState(false);
  const outerPillRef = useRef(null);

  useEffect(() => {
    const el = outerPillRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          anime({
            targets: el,
            borderColor: ['#E8A33D44', '#E8A33D'],
            duration: 1500,
            easing: 'easeOutQuad',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes particleFloat {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
      `}</style>

      {/* Hero */}
      <section className={`hero ${montserrat.className}`} id="home">
        <div className="hero-bg" />
        <ParticleBackground />

        <div className="container hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.h1
              className="hero-title"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
            >
              Engineering & Industrial<br />
              <span style={{ color: '#E8A73B', background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset' }}>Solutions That Power Progress</span>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
            >
              Delivering Fabricated Contracting solution, Automation, Maintenance and Creative Works across Saudi Arabia, GCC and Pak.
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
            >
              <Link href="/solutions" className="btn btn-primary btn-lg">Explore Our Solutions <i className="fas fa-arrow-right" /></Link>
              <Link href="/projects" className="btn btn-outline btn-lg">View Our Work</Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
          >
            <div className="hero-stats" style={{ marginTop: -36 }}>
              <MetricCounter target={siteConfig.stats.projects} suffix="+" label="Projects Delivered" />
              <MetricCounter target={siteConfig.stats.years} suffix="+" label="Years Experience" />
              <MetricCounter target={siteConfig.stats.team} suffix="+" label="Expert Team" />
              <MetricCounter target={siteConfig.stats.efficiency} suffix="%" label="Project Efficiency" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 — About IHAC Brief (moved to /about) */}

      {/* 4 — Main Business Divisions — Three-Column Editorial Layout */}
      <HexCarousel />

      {/* 5 — Why Choose IHAC */}
      <section className="section bg-alt">
        <div className="container">
          <ScrollReveal>
            <div className="why-outer-pill" ref={outerPillRef}>
            <div className="why-section-row">
              <div className="why-left">
                <ScrollReveal>
                  <h2>Why Clients Continue <span className="gradient-text">Working With Us</span></h2>
                  <p>Our 100% customer retention rate reflects the strength of our long-term partnerships, built on trust, consistent delivery, and technical excellence across every project.</p>
                  <Link href="/solutions" className="why-cta-btn">
                    Explore Services <i className="fas fa-arrow-right" />
                  </Link>
                </ScrollReveal>
              </div>
              <div className="why-right">
                <motion.div
                  className="why-cards-row"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ staggerChildren: 0.15 }}
                >
                  {whyUs.map((w, i) => (
                    <motion.div
                      key={w.title}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
                      }}
                    >
                      <div
                        className="why-card-new"
                        onMouseEnter={(e) => {
                          const icon = e.currentTarget.querySelector('.why-icon-new');
                          if (icon) anime({ targets: icon, translateY: -5, scale: 1.05, duration: 300, easing: 'easeOutQuad' });
                        }}
                        onMouseLeave={(e) => {
                          const icon = e.currentTarget.querySelector('.why-icon-new');
                          if (icon) anime({ targets: icon, translateY: 0, scale: 1, duration: 300, easing: 'easeOutQuad' });
                        }}
                      >
                        <span className="why-card-badge">{i + 1}</span>
                        <div className="why-icon-new">
                          {w.icon === 'Medal' ? <Medal size={28} strokeWidth={1.5} /> : w.icon === 'Comments' ? <MessagesSquare size={28} strokeWidth={1.5} /> : w.icon === 'Clock' ? <Clock size={28} strokeWidth={1.5} /> : w.icon === 'Headset' ? <Headset size={28} strokeWidth={1.5} /> : <Lightbulb size={28} strokeWidth={1.5} />}
                        </div>
                        <h4>{w.title}</h4>
                        <p>{w.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
          </div>
        </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6 — Industries We Serve */}
      <section className="section bg-alt section-industries">
        <div className="container">
          <ScrollReveal>
            <SectionHeader title="Sectors We <span class='gradient-text'>Serve</span>" text="Our broad project experience spans multiple industries across the region." />
          </ScrollReveal>
          <IndustriesAccordion />
        </div>
      </section>

      {/* 8 — Featured Projects / 3D Coverflow Carousel */}
      <section className="section coverflow-section">
        <div className="container" style={{ paddingBottom: 0 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
            className="flex flex-col md:flex-row items-start md:items-baseline gap-4 text-left mb-6"
          >
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold leading-relaxed tracking-wide">
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 15, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Creative <span style={{ color: '#F2B544' }}>Projects That </span> 
                </motion.span>
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 15, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-gray-500"
                >
                  Define Our Style
                </motion.span>
              </h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 15, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-gray-400 max-w-[600px] opacity-80"
              >
                Visual proof of our capability across every division.
              </motion.p>
            </div>
          </motion.div>
        </div>
        <ProjectCoverflow initialProjects={initialProjects} />
      </section>

      {/* 9 — Downloads Preview */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader title="Downloads & <span class='gradient-text'>Resources</span>" text="Access company documents, brochures, certifications, and case studies." />
          </ScrollReveal>
          <div className="download-home-grid">
            {downloadsData.categories.slice(0, 3).map((cat, i) => (
              <ScrollReveal key={i}>
                <div className="download-home-card">
                  <h4>{cat.name}</h4>
                  <ul>
                    {cat.items.slice(0, 2).map((item, j) => (
                      <li key={j}><i className="fas fa-file-pdf" style={{ color: '#ef4444', marginRight: 8 }} />{item.name}</li>
                    ))}
                  </ul>
                  <Link href="/downloads" className="btn btn-outline" style={{ marginTop: 12, padding: '8px 20px', fontSize: '0.8rem' }}>Browse All <i className="fas fa-arrow-right" /></Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/downloads" className="btn btn-primary">Visit Resource Center <i className="fas fa-arrow-right" /></Link>
          </div>
        </div>
      </section>

      {/* 10 — Final Call to Action */}
      <section className="section cta-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 16 }}>Ready to Start <span className="gradient-text">Your Project?</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>Submit your project requirements, upload drawings or RFQs, and our team will get back to you within 24 hours.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary btn-lg">Submit Your Requirement <i className="fas fa-arrow-right" /></Link>
              <Link href="/contact" className="btn btn-outline btn-lg">Request a Site Visit</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
