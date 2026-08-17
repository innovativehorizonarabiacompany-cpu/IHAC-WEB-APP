'use client';
import PillarPage from '@/components/PillarPage';
import MaintenanceCapabilities from '@/components/Maintenance/MaintenanceCapabilities';
export default function MaintenancePage() {
  return <PillarPage divisionId="maintenance" heroImage="/Maintenance/hero-section.png" hideBadge capabilityExperience={MaintenanceCapabilities} />;
}
