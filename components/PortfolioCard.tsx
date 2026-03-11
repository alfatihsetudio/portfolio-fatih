"use client";

import type { PortfolioItem } from "@/data/portfolio";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";

interface PortfolioCardProps {
  project: PortfolioItem;
  variant?: "featured" | "grid";
  className?: string;
}

export default function PortfolioCard({
  project,
  variant = "grid",
  className,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const canHoverRef = useRef(false);

  useEffect(() => {
    canHoverRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;

    if (!card || !canHoverRef.current) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;

    if (!card || !canHoverRef.current) {
      return;
    }

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const featured = variant === "featured";
  const cardTone = featured
    ? "bg-[linear-gradient(160deg,rgba(27,31,43,0.9),rgba(14,17,24,0.9))]"
    : "bg-[var(--color-surface)]";

  return (
    <Link
      ref={cardRef}
      href={`/portfolio/${project.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`portfolio-card group block overflow-hidden rounded-2xl border border-[var(--color-border)] ${cardTone} transition-[transform,border-color,box-shadow] duration-500 hover:border-[rgba(218,173,97,0.5)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${className ?? ""}`}
    >
      <div
        className={`relative overflow-hidden ${featured ? "aspect-[9/11] sm:aspect-[16/19]" : "aspect-[4/5]"}`}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          loading="lazy"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      </div>

      <div className={`${featured ? "space-y-2 p-5 sm:p-6" : "space-y-2 p-4 sm:p-5"}`}>
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">
          {project.category}
        </p>
        <h3
          className={`font-display leading-tight font-semibold text-white transition-colors duration-300 group-hover:text-[var(--color-accent)] ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
        >
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
