"use client";

import type { PortfolioItem } from "@/data/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProjectGallery from "./ProjectGallery";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailViewProps {
  project: PortfolioItem;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const article = articleRef.current;

    if (!article) {
      return;
    }

    const ctx = gsap.context(() => {
      const introTargets = article.querySelectorAll("[data-detail-intro]");
      const heroImage = article.querySelector("[data-detail-hero-image]");

      gsap.fromTo(
        introTargets,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.11,
          ease: "power3.out",
        }
      );

      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heroImage,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, article);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={articleRef} className="pb-16 lg:pb-24">
      <section className="relative flex min-h-screen items-end overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-32">
        <div data-detail-hero-image className="absolute inset-0 scale-105">
          <Image
            src={project.images[0] ?? project.thumbnail}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="container-shell relative z-10">
          <Link
            data-detail-intro
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--color-accent)] transition-colors hover:text-white"
          >
            <span aria-hidden>{"<-"}</span>
            Back To Portfolio
          </Link>
          <p
            data-detail-intro
            className="mt-6 text-xs uppercase tracking-[0.14em] text-zinc-300"
          >
            {project.category}
          </p>
          <h1
            data-detail-intro
            className="font-display mt-3 max-w-4xl text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            {project.title}
          </h1>
          <p
            data-detail-intro
            className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-200 lg:text-lg"
          >
            {project.description}
          </p>
        </div>
      </section>

      <section className="container-shell mt-8">
        <ProjectGallery title={project.title} images={project.images} />
      </section>
    </article>
  );
}
