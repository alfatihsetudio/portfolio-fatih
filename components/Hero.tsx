"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const background = bgRef.current;

    if (!section || !content || !background) {
      return;
    }

    const ctx = gsap.context(() => {
      const revealItems = content.querySelectorAll("[data-hero-reveal]");

      gsap.fromTo(
        background,
        { autoAlpha: 0, scale: 1.07 },
        { autoAlpha: 1, scale: 1.03, duration: 1.5, ease: "power2.out" }
      );

      gsap.fromTo(
        revealItems,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.13,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.to(background, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/images/cinematic-hero.svg"
          alt="Cinematic studio visual"
          fill
          priority
          sizes="100vw"
          className="h-auto w-full object-cover object-center"
        />
      </div>

      <div className="hero-overlay" />
      <div className="hero-grain" />

      <div ref={contentRef} className="container-shell relative z-10 w-full">
        <div className="max-w-4xl">
          <p
            data-hero-reveal
            className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Cinematic Photo and Film Studio
          </p>
          <h1
            data-hero-reveal
            className="font-display text-4xl leading-[1.02] font-semibold text-white sm:text-5xl lg:text-6xl"
          >
            High-end visual storytelling for brands, artists, and timeless
            moments.
          </h1>
          <p
            data-hero-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 lg:text-lg"
          >
            We direct, capture, and craft cinematic imagery designed to leave a
            lasting emotional impression.
          </p>
          <div
            data-hero-reveal
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)] bg-[rgba(218,173,97,0.18)] px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-[rgba(218,173,97,0.3)]"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 text-xs uppercase tracking-[0.15em] text-zinc-200 transition-colors hover:border-zinc-300 hover:text-white"
            >
              Start Project
            </a>
          </div>
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-300 sm:bottom-8"
      >
        Scroll
        <span className="inline-flex h-9 w-5 items-start justify-center rounded-full border border-zinc-400/60 p-1">
          <span className="scroll-indicator-dot h-2 w-2 rounded-full bg-zinc-100" />
        </span>
      </a>
    </section>
  );
}
