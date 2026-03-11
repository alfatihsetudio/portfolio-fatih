"use client";

import type { PortfolioItem } from "@/data/portfolio";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";

interface PortfolioCardProps {
  project: PortfolioItem;
  variant?: "masonry" | "grid";
  index?: number;
}

export default function PortfolioCard({
  project,
  variant = "masonry",
  index = 0,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const canHoverRef = useRef(false);

  useEffect(() => {
    canHoverRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  const onPointerMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;

    if (!card || !canHoverRef.current) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 5,
      rotateX: -y * 4,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const onPointerLeave = () => {
    const card = cardRef.current;

    if (!card || !canHoverRef.current) {
      return;
    }

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const aspect =
    variant === "masonry"
      ? index % 5 === 0
        ? "aspect-[4/5]"
        : index % 3 === 0
          ? "aspect-[4/6]"
          : "aspect-[4/4.8]"
      : "aspect-[4/5]";

  return (
    <Link
      ref={cardRef}
      href={`/portfolio/${project.slug}`}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      className="portfolio-card group mb-5 block break-inside-avoid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-[transform,border-color,box-shadow] duration-500 hover:border-[rgba(218,173,97,0.55)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.5)]"
    >
      <div className={`relative overflow-hidden ${aspect}`}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent transition-opacity duration-400" />

        <div className="absolute inset-x-0 bottom-0 p-5 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {project.category}
          </p>
          <h3 className="font-display mt-2 text-2xl font-semibold text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
