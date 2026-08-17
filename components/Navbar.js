'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/data/siteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'navbar-scrolled' : ''}>
      <div className="container nav-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/images/ihac-logo.png" alt="IHAC" style={{ height: 49, width: 'auto' }} />
        </Link>
        <div
          className={'nav-toggle' + (open ? ' active' : '')}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </div>
        <ul className={'nav-links' + (open ? ' open' : '')}>
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.href} className="dropdown-trigger nav-link">
                <Link href={link.href} className="nav-link" style={{ display: 'inline' }}>{link.label}</Link> <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem', marginLeft: 4 }} />
                <div className="dropdown-menu">
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href} className="dropdown-link">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={'nav-link' + (pathname === link.href ? ' active' : '')}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
