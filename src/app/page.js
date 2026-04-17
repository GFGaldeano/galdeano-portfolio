// src/app/page.js
'use client';

import HeroSection from '../components/sections/HeroSection';
import SolarSystem from '../components/sections/SolarSystem';
import SkillsNebula from '../components/sections/SkillsNebula';
import ProjectPlanets from '../components/sections/ProjectPlanets';
import SpacePort from '../components/sections/SpacePort';
import Header from '../components/layout/Header';
import SpaceFooter from '../components/layout/SpaceFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <SolarSystem />
        <SkillsNebula />
        <ProjectPlanets />
        <SpacePort />
      </main>
      <SpaceFooter />
    </div>
  );
}
