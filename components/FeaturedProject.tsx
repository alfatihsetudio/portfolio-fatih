"use client";

import type { PortfolioItem } from "@/data/portfolio";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectProps {
  project: PortfolioItem;
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll("[data-featured-reveal]");

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured" ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div className="mb-8" data-featured-reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Featured Project
          </p>
          <h2 className="font-display mt-3 text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
            Signature visual campaign.
          </h2>
        </div>

        <Link
          href={`/portfolio/${project.slug}`}
          data-featured-reveal
          className="group grid overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] md:grid-cols-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[28rem]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {project.category}
            </p>
            <h3 className="font-display mt-4 text-3xl leading-tight font-semibold text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-zinc-300">
              {project.description}
            </p>
            <span className="mt-8 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-100">
              View Project <span aria-hidden>{"->"}</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
