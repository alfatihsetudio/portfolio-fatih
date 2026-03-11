import portfolioData from "./portfolio.json";

export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  featured?: boolean;
}

const portfolio = portfolioData as PortfolioItem[];

export function getPortfolioItems(): PortfolioItem[] {
  return portfolio;
}

export function getFeaturedPortfolioItems(limit = 3): PortfolioItem[] {
  const featured = portfolio.filter((item) => item.featured);

  if (featured.length > 0) {
    return featured.slice(0, limit);
  }

  return portfolio.slice(0, limit);
}

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.slug === slug);
}
