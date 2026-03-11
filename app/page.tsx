import About from "@/components/About";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getFeaturedPortfolioItems, getPortfolioItems } from "@/data/portfolio";

export default function Home() {
  const projects = getPortfolioItems();
  const featured = getFeaturedPortfolioItems();

  return (
    <main className="overflow-x-clip pb-16 lg:pb-24">
      <Hero />
      <About />
      <FeaturedProjects projects={featured} />
      <PortfolioGrid projects={projects} />
      <CTA />
      <Contact />
    </main>
  );
}
