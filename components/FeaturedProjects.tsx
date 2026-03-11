"use client";

import type { PortfolioItem } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioCard from "./PortfolioCard";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: PortfolioItem[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = section.querySelectorAll("[data-featured-item]");
      gsap.fromTo(
        reveal,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured" ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div className="mb-7 sm:mb-10" data-featured-item>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Featured Projects
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-2xl leading-tight font-semibold text-white sm:text-3xl lg:text-4xl">
            Signature stories from selected client work.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const wideSpan = index === 0 ? "lg:col-span-2" : "";

            return (
              <div key={project.id} data-featured-item className={wideSpan}>
                <PortfolioCard
                  project={project}
                  variant="featured"
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
