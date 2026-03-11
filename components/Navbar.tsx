"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  isHome?: boolean;
}

const sectionLinks = [
  { id: "featured", label: "Featured" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ isHome = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-[rgba(8,10,14,0.75)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-shell flex items-center justify-between py-4">
          <Link
            href="/"
            className="font-display text-base font-semibold tracking-[0.18em] text-white sm:text-lg"
          >
            FATIH STUDIO
          </Link>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.16em] text-zinc-300 lg:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={toHref(link.id)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white lg:hidden"
          >
            <span className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[min(82vw,22rem)] border-l border-white/10 bg-[var(--color-surface)] p-6 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Menu</p>
          <nav className="mt-10 flex flex-col gap-5 text-sm uppercase tracking-[0.16em] text-zinc-200">
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={toHref(link.id)}
                onClick={() => setMenuOpen(false)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
