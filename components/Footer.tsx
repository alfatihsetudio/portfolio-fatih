export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-shell flex flex-col gap-6 text-sm text-zinc-400 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-[0.08em] text-zinc-100">
            FATIH STUDIO
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em]">
            Cinematic Photo and Film
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.14em]">
          <a href="#featured" className="transition-colors hover:text-white">
            Featured
          </a>
          <a href="#portfolio" className="transition-colors hover:text-white">
            Portfolio
          </a>
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.14em] lg:items-end">
          <a
            href="https://instagram.com/fatihcreative"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Instagram
          </a>
          <p className="text-zinc-500">© {new Date().getFullYear()} Fatih Studio</p>
        </div>
      </div>
    </footer>
  );
}
