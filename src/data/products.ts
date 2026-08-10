import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Floral Initial Handkerchief",
    price: 499,
    category: "Handkerchiefs",
    image: "/products/floral-handkerchief.png",
    slug: "floral-initial-handkerchief",
  },
  {
    id: 2,
    name: "Love Handkerchief",
    price: 449,
    category: "Handkerchiefs",
    image: "/products/love-handkerchief.jpg",
    slug: "love-handkerchief",
  },
  {
    id: 3,
    name: "Lavender Embroidered Shirt",
    price: 1199,
    category: "Shirts",
    image: "/products/embroidered-shirt.jpg",
    slug: "lavender-embroidered-shirt",
  },
  {
    id: 4,
    name: "Minimal Initial Hoodie",
    price: 1399,
    category: "Hoodies",
    image: "/products/initial-hoodie.jpg",
    slug: "minimal-initial-hoodie",
  },
];