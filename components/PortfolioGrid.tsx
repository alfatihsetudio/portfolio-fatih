"use client";

import type { PortfolioItem } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioCard from "./PortfolioCard";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioGridProps {
  projects: PortfolioItem[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const heading = section.querySelectorAll("[data-grid-reveal]");
      const cards = section.querySelectorAll(".portfolio-card");

      gsap.fromTo(
        heading,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 86%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div className="mb-8 lg:mb-12">
          <p
            data-grid-reveal
            className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Portfolio Gallery
          </p>
          <h2
            data-grid-reveal
            className="font-display mt-3 max-w-4xl text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            A curated archive of cinematic visual stories.
          </h2>
        </div>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 xl:columns-4">
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              variant="masonry"
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
