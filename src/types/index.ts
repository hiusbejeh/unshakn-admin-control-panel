
// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  video?: string;
  sizes: Size[];
  stock: number;
  tags: string[];
  ratings: Rating[];
  wishlisted: number;
  slug: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type BodyType = 'Slim' | 'Athletic' | 'Bulky';

export interface SizeRecommendation {
  size: Size;
  bodyType: BodyType;
  fitTip: string;
}

export interface Rating {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  pinned: boolean;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Stats types
export interface Stats {
  totalProducts: number;
  totalStock: number;
  totalWishlists: number;
  visitors: number;
}

// Size Estimator types
export interface SizeRule {
  minHeight: number;
  maxHeight: number;
  minWeight: number;
  maxWeight: number;
  recommendedSize: Size;
  bodyType: BodyType;
}

// Theme types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  logo: string;
}
