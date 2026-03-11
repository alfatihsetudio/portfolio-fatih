"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = section.querySelectorAll("[data-cta-item]");
      gsap.fromTo(
        reveal,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div className="rounded-3xl border border-[rgba(218,173,97,0.35)] bg-[linear-gradient(160deg,rgba(26,22,16,0.78),rgba(11,13,19,0.88))] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <p
            data-cta-item
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Collaboration
          </p>
          <h2
            data-cta-item
            className="font-display mt-3 max-w-4xl text-2xl leading-tight font-semibold text-white sm:text-3xl lg:text-4xl"
          >
            Let&apos;s create something extraordinary together.
          </h2>
          <a
            data-cta-item
            href="#contact"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-[var(--color-accent)] bg-[rgba(218,173,97,0.15)] px-6 py-3 text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-[rgba(218,173,97,0.28)] sm:w-auto"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
