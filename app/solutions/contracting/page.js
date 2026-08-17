'use client';
import PillarPage from '@/components/PillarPage';
import ContractingCapabilities from '@/components/Contracting/ContractingCapabilities';
import ConclusionCTA from '@/components/Contracting/ConclusionCTA';
export default function ContractingPage() {
  return <PillarPage divisionId="contracting" heroImage="/Contracting_fabrication/hero_section_image.png" hideBadge capabilityExperience={ContractingCapabilities} conclusion={<ConclusionCTA />} />;
}
