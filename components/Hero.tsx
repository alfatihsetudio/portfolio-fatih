"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#featured", label: "Featured" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;

    if (!section || !background || !content) {
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = content.querySelectorAll("[data-hero-item]");
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline.fromTo(
        reveal,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.12 }
      );

      gsap.to(background, {
        yPercent: 8,
        scale: 1.07,
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div ref={backgroundRef} className="absolute inset-0 scale-105">
        <Image
          src="/images/cinematic-hero.svg"
          alt="Creative studio cinematic scene"
          fill
          priority
          sizes="100vw"
          className="h-auto w-full object-cover object-center"
        />
      </div>

      <div className="hero-overlay" />
      <div className="hero-grain" />

      <header className="absolute top-0 left-0 z-20 w-full py-5">
        <div className="container-shell flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-[0.08em] text-white sm:text-xl"
          >
            FATIH
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
          >
            <span className="sr-only">Open menu</span>
            <span className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.15em] text-zinc-300 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 md:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 border-l border-white/10 bg-[var(--color-surface)] p-6 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Menu</p>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200"
            >
              Close
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-5 text-sm uppercase tracking-[0.13em] text-zinc-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div ref={contentRef} className="container-shell relative z-10 w-full pb-24 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center md:text-left">
          <p
            data-hero-item
            className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Creative Photo and Film Studio
          </p>
          <h1
            data-hero-item
            className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl"
          >
            We craft visual stories with cinematic depth.
          </h1>
          <p
            data-hero-item
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-200 md:mx-0 lg:text-lg"
          >
            Premium photography, videography, and visual direction for brands,
            artists, and moments that deserve timeless imagery.
          </p>
          <div
            data-hero-item
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)] bg-[rgba(218,173,97,0.18)] px-6 py-3 text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-[rgba(218,173,97,0.28)]"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 text-xs uppercase tracking-[0.14em] text-zinc-200 transition-colors hover:border-zinc-300 hover:text-white"
            >
              Start Project
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-300 sm:bottom-8 sm:right-8 sm:left-auto sm:translate-x-0"
      >
        Scroll
        <span className="inline-flex h-9 w-5 items-start justify-center rounded-full border border-zinc-400/60 p-1">
          <span className="scroll-indicator-dot h-2 w-2 rounded-full bg-zinc-100" />
        </span>
      </a>
    </section>
  );
}
