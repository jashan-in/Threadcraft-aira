import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#f7ece6]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-sm hover:text-[#d98186]"
          >
            <Heart size={18} />
          </button>
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          {product.category}
        </p>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 text-sm font-medium text-[#2f2928] hover:text-[#d98186]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm font-semibold">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}