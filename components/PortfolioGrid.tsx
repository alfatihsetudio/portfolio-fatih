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
      const heading = section.querySelector("[data-grid-heading]");
      const cards = section.querySelectorAll(".portfolio-card");

      if (heading) {
        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div data-grid-heading className="mb-8 flex flex-col gap-5 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Full Portfolio
            </p>
            <h2 className="font-display mt-3 text-2xl leading-tight font-semibold text-white sm:text-3xl lg:text-4xl">
              Complete collection.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            Explore a complete selection of campaign work, documentary moments,
            and visual design pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
