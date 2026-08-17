'use client';
import { Montserrat } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import styles from '@/components/creativeWorks/creative.module.css';
import CreativeHero from '@/components/creativeWorks/CreativeHero';
import WhatWeCreate from '@/components/creativeWorks/WhatWeCreate';
import CreativeProcess from '@/components/creativeWorks/CreativeProcess';
import SignatureExperiences from '@/components/creativeWorks/SignatureExperiences';
import ServiceGrid from '@/components/creativeWorks/ServiceGrid';
import FeaturedCarousel from '@/components/creativeWorks/FeaturedCarousel';
import Metrics from '@/components/creativeWorks/Metrics';
import ImageWall from '@/components/creativeWorks/ImageWall';
import FinalCTA from '@/components/creativeWorks/FinalCTA';
import Divider from '@/components/creativeWorks/Divider';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export default function CreativePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.creativePage}>
        <div className={montserrat.className}>
          <CreativeHero />
          <WhatWeCreate />
          <Divider />
          <CreativeProcess />
          <SignatureExperiences />
          <ServiceGrid />
          <Divider />
          <FeaturedCarousel />
          <Metrics />
          <ImageWall />
          <Divider />
          <FinalCTA />
        </div>
      </div>
    </MotionConfig>
  );
}