"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStudio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll("[data-about-reveal]");

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
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
        <div className="grid gap-7 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 lg:grid-cols-2 lg:gap-12 lg:p-10">
          <div className="space-y-5">
            <p
              data-about-reveal
              className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
            >
              About Studio
            </p>
            <h2
              data-about-reveal
              className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl"
            >
              A boutique visual studio built on atmosphere, clarity, and
              emotion.
            </h2>
            <p data-about-reveal className="text-base leading-relaxed text-zinc-300">
              We approach every project as a cinematic narrative. From concept
              development to final delivery, we shape visuals that feel
              intentional, elevated, and memorable.
            </p>
            <p data-about-reveal className="text-base leading-relaxed text-zinc-300">
              Our work blends editorial composition, documentary honesty, and
              premium post-production for brands and creators who care about
              visual depth.
            </p>
          </div>

          <div data-about-reveal className="relative overflow-hidden rounded-2xl border border-[var(--color-border)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/project-editorial.svg"
                alt="Studio philosophy visual accent"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
