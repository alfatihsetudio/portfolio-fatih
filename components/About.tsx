"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = section.querySelectorAll("[data-about-item]");
      gsap.fromTo(
        reveal,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
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
    <section id="about" ref={sectionRef} className="section-space">
      <div className="container-shell">
        <div className="grid gap-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-12">
          <div className="space-y-4">
            <p
              data-about-item
              className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
            >
              Introduction
            </p>
            <h2
              data-about-item
              className="font-display max-w-xl text-2xl leading-tight font-semibold text-white sm:text-3xl lg:text-4xl"
            >
              Crafted for emotion, shaped for impact.
            </h2>
          </div>

          <div className="space-y-6">
            <p
              data-about-item
              className="text-sm leading-relaxed text-zinc-300 md:text-base"
            >
              We are a small creative studio focused on visual storytelling for
              photographers, filmmakers, and modern brands. Every frame is
              built with rhythm, atmosphere, and refined composition.
            </p>

            <div
              data-about-item
              className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-6 sm:gap-8"
            >
              <div>
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  60+
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">
                  Completed Projects
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  8
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
