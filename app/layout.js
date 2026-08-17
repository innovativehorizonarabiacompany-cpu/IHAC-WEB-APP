'use client';
import { useState } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import BackToTop from '@/components/BackToTop';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/glacial-indifference-2" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <title>IHAC - Innovative Horizon Arabia Company</title>
        <meta name="description" content="Innovative Horizon Arabia Company (IHAC) — Saudi-based industrial solutions provider offering automation, maintenance, contracting, and creative works. ISO-certified. Aramco Vendor ID 10113193." />
      </head>
      <body>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
        <Navbar />
        <ThemeToggle />
        <BackToTop />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
