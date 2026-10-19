export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Load lazily (default true) */
  lazy?: boolean;
  className?: string;
}

export interface Slide extends Image {
  caption?: string;
}

export interface MetaItem {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  /** Two-digit number shown on cards and in the kicker, e.g. "01" */
  num: string;
  /** Product this case study belongs to (key into products) */
  product: 'apodienste' | 'arkk' | 'university';
  /** Short title for the "In this edition" list */
  shortTitle: string;
  /** Title on the home page case study row */
  cardTitle: string;
  /** Discipline · year line on the row */
  rowMeta: string;
  chip?: string;
  summary: string;
  thumb: Image;
  /** Compact row (university projects) */
  compact?: boolean;

  /** Case study page */
  page: {
    title: string; // h1
    metaTitle: string; // <title>, og:title
    description: string; // meta description
    ogImage: string;
    kicker: { discipline: string; org: string; year: string };
    standfirst?: string;
    meta: MetaItem[];
    heroVideo?: { src: string; poster?: string; ariaLabel: string; caption: string };
    /** Contents list: section ids and labels, in order */
    sections: { id: string; label: string }[];
    /** "Next case studies" links at the end of the page */
    nextStories: string[];
  };
}

export interface Product {
  key: 'apodienste' | 'arkk' | 'university';
  name: string;
  /** Mono kicker after "Product ·", e.g. "PharmaBits · 2024" */
  kicker?: string;
  about?: string;
  meta?: MetaItem[];
  minor?: boolean;
  thumb?: {
    org: string;
    tint: 'apodienste' | 'arkk';
    carousel?: { label: string; slides: Slide[] };
    image?: Image;
  };
  analyticsName: string;
}

export interface Principle {
  numeral: string;
  title: string;
  body: string;
}
