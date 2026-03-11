import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fatih Creative Studio",
    template: "%s | Fatih Creative Studio",
  },
  description:
    "Cinematic portfolio for photography, film, and visual storytelling projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
