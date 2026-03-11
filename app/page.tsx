import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import FeaturedProject from "@/components/FeaturedProject";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PortfolioGrid from "@/components/PortfolioGrid";
import Process from "@/components/Process";
import AboutStudio from "@/components/AboutStudio";
import { getFeaturedPortfolioItems, getPortfolioItems } from "@/data/portfolio";

export default function Home() {
  const projects = getPortfolioItems();
  const featured = getFeaturedPortfolioItems(1)[0];

  return (
    <main className="overflow-x-clip pb-16 lg:pb-24">
      <Navbar />
      <Hero />
      {featured ? <FeaturedProject project={featured} /> : null}
      <PortfolioGrid projects={projects} />
      <AboutStudio />
      <Process />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
