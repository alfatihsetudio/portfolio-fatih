import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell section-padding flex min-h-screen flex-col items-start justify-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
        404
      </p>
      <h1 className="font-display mt-3 text-5xl text-white sm:text-6xl">
        Project not found
      </h1>
      <p className="text-muted mt-4 max-w-lg">
        The portfolio item you requested does not exist or may have been moved.
      </p>
      <Link
        href="/#portfolio"
        className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-100 transition-colors hover:text-[var(--color-accent)]"
      >
        <span aria-hidden>←</span>Back to portfolio
      </Link>
    </main>
  );
}
