import Hero from "@/components/portfolio/Hero";
import PartnershipsRail from "@/components/portfolio/PartnershipsRail";
import StatsBio from "@/components/portfolio/StatsBio";
import BrandSectionPersonal from "@/components/portfolio/BrandSectionPersonal";
import BrandSectionCluely from "@/components/portfolio/BrandSectionCluely";
import BrandSectionJobright from "@/components/portfolio/BrandSectionJobright";
import AudienceDemographics from "@/components/portfolio/AudienceDemographics";
import Footer from "@/components/portfolio/Footer";
import Reveal from "@/components/portfolio/Reveal";
import { PortfolioContentProvider } from "@/lib/PortfolioContentContext";

export default function Portfolio() {
  return (
    <PortfolioContentProvider>
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Reveal><PartnershipsRail /></Reveal>
      <Reveal><StatsBio /></Reveal>
      <Reveal><BrandSectionPersonal /></Reveal>
      <Reveal><BrandSectionCluely /></Reveal>
      <Reveal><BrandSectionJobright /></Reveal>
      <Reveal><AudienceDemographics /></Reveal>
      <Footer />
    </main>
    </PortfolioContentProvider>
  );
}