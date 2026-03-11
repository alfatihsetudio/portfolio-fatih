"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const reveal = section.querySelectorAll("[data-contact-item]");
      gsap.fromTo(
        reveal,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-space pt-8 lg:pt-10">
      <div className="container-shell">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-8 sm:px-8 sm:py-10">
          <p
            data-contact-item
            className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Contact
          </p>
          <h2
            data-contact-item
            className="font-display mt-3 max-w-2xl text-2xl leading-tight font-semibold text-white sm:text-3xl lg:text-4xl"
          >
            Ready to start your next visual chapter?
          </h2>

          <div className="mt-8 grid gap-4 text-sm sm:text-base md:grid-cols-2 lg:grid-cols-3">
            <a
              data-contact-item
              href="mailto:hello@fatihcreative.com"
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-zinc-200 transition-colors hover:text-white"
            >
              hello@fatihcreative.com
            </a>
            <a
              data-contact-item
              href="https://instagram.com/fatihcreative"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-zinc-200 transition-colors hover:text-white"
            >
              instagram.com/fatihcreative
            </a>
            <a
              data-contact-item
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-zinc-200 transition-colors hover:text-white"
            >
              WhatsApp: +62 812-3456-7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
