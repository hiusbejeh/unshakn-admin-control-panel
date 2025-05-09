
import { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Elite Training Hoodie",
    price: 79.99,
    description: "Premium athletic hoodie made with moisture-wicking technology for intense workouts.",
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    tags: ["hoodie", "premium", "training"],
    ratings: [
      {
        id: "r1",
        user: "John D.",
        rating: 5,
        comment: "Best training hoodie I've ever worn!",
        date: "2023-04-15",
        pinned: true
      },
      {
        id: "r2",
        user: "Emily S.",
        rating: 4,
        comment: "Great quality but runs slightly small.",
        date: "2023-03-22",
        pinned: false
      }
    ],
    wishlisted: 127,
    slug: "elite-training-hoodie"
  },
  {
    id: "2",
    name: "Performance Track Pants",
    price: 64.99,
    description: "Streamlined track pants with 4-way stretch and quick-dry technology.",
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 18,
    tags: ["pants", "track", "performance"],
    ratings: [
      {
        id: "r3",
        user: "Michael T.",
        rating: 5,
        comment: "Perfect fit and super comfortable!",
        date: "2023-05-02",
        pinned: false
      }
    ],
    wishlisted: 95,
    slug: "performance-track-pants"
  },
  {
    id: "3",
    name: "Compression Athlete Tee",
    price: 49.99,
    description: "Form-fitting compression shirt that enhances performance and muscle recovery.",
    category: "shirts",
    image: "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    stock: 3,
    tags: ["compression", "tee", "recovery"],
    ratings: [
      {
        id: "r4",
        user: "Sarah M.",
        rating: 4,
        comment: "Great compression without being too tight.",
        date: "2023-04-18",
        pinned: false
      },
      {
        id: "r5",
        user: "David R.",
        rating: 5,
        comment: "Noticeable difference in recovery time.",
        date: "2023-03-15",
        pinned: true
      }
    ],
    wishlisted: 156,
    slug: "compression-athlete-tee"
  },
  {
    id: "4",
    name: "Pro Training Shorts",
    price: 54.99,
    description: "Lightweight training shorts with built-in compression liner.",
    category: "bottoms",
    image: "https://images.unsplash.com/photo-1562886812-41775a01195d?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    video: "https://www.instagram.com/p/example-shorts-video/",
    sizes: ["S", "M", "L", "XL"],
    stock: 32,
    tags: ["shorts", "training", "lightweight"],
    ratings: [
      {
        id: "r6",
        user: "James K.",
        rating: 5,
        comment: "These shorts are a game-changer for my workouts!",
        date: "2023-05-10",
        pinned: false
      }
    ],
    wishlisted: 78,
    slug: "pro-training-shorts"
  },
  {
    id: "5",
    name: "Endurance Sports Bra",
    price: 44.99,
    description: "High-impact sports bra designed for maximum support and comfort.",
    category: "womens",
    image: "https://images.unsplash.com/photo-1584316712724-ad3d816c651d?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["XS", "S", "M", "L"],
    stock: 0,
    tags: ["sports bra", "support", "womens"],
    ratings: [
      {
        id: "r7",
        user: "Lauren B.",
        rating: 5,
        comment: "Finally found a sports bra that actually works!",
        date: "2023-05-02",
        pinned: true
      },
      {
        id: "r8",
        user: "Melissa C.",
        rating: 4,
        comment: "Great support but could use more padding.",
        date: "2023-04-12",
        pinned: false
      }
    ],
    wishlisted: 213,
    slug: "endurance-sports-bra"
  },
  {
    id: "6",
    name: "Elite Athlete Jacket",
    price: 129.99,
    description: "Lightweight, water-resistant jacket perfect for outdoor training.",
    category: "outerwear",
    image: "https://images.unsplash.com/photo-1578932014993-b3110c9c9ea9?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 7,
    tags: ["jacket", "water-resistant", "outdoor"],
    ratings: [
      {
        id: "r9",
        user: "Robert L.",
        rating: 5,
        comment: "Perfect for morning runs in any weather!",
        date: "2023-04-30",
        pinned: false
      }
    ],
    wishlisted: 89,
    slug: "elite-athlete-jacket"
  }
];

export const categories = [
  { id: "1", name: "Hoodies", slug: "hoodies" },
  { id: "2", name: "Bottoms", slug: "bottoms" },
  { id: "3", name: "Shirts", slug: "shirts" },
  { id: "4", name: "Womens", slug: "womens" },
  { id: "5", name: "Outerwear", slug: "outerwear" }
];
