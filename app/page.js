import { parseProjectsTable } from '@/utils/parseProjects';
import { projectImages } from '@/data/projectImages';
import { ihacHistoryProjects } from '@/data/ihacHistoryProjects';
import HomePageClient from './HomePageClient';

export default function HomePage() {
  const projects = parseProjectsTable(ihacHistoryProjects).map((p) => ({
    ...p,
    image: projectImages[p.title] || '',
  }));
  return <HomePageClient initialProjects={projects} />;
}