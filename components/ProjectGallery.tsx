"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGalleryProps {
  title: string;
  images: string[];
}

export default function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll("[data-gallery-item]");

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
      {images.map((image, index) => {
        const tall = index % 3 === 0;

        return (
          <figure
            key={`${image}-${index}`}
            data-gallery-item
            className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <div className={`relative ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
              <Image
                src={image}
                alt={`${title} gallery image ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
