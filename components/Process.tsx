"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Concept",
    description:
      "We align on direction, moodboard, references, and storytelling intent.",
  },
  {
    title: "Production",
    description:
      "On-location or studio capture with premium visual direction and pacing.",
  },
  {
    title: "Editing",
    description:
      "Color, rhythm, and visual polish refined into a cinematic final sequence.",
  },
  {
    title: "Delivery",
    description:
      "Exported and optimized for campaigns, social media, and digital platforms.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll("[data-process-reveal]");

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
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
    <section id="process" ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div className="mb-8 lg:mb-10">
          <p
            data-process-reveal
            className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Process / Services
          </p>
          <h2
            data-process-reveal
            className="font-display mt-3 text-3xl leading-tight font-semibold text-white sm:text-4xl"
          >
            How we build every project.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              data-process-reveal
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(218,173,97,0.45)] text-sm font-semibold text-[var(--color-accent)]">
                {index + 1}
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
