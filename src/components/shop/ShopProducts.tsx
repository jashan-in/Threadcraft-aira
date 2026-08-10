"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

const categories = [
  "All",
  "Handkerchiefs",
  "Shirts",
  "Hoodies",
  "Custom Gifts",
];

type SortOption = "default" | "low-high" | "high-low";

export default function ShopProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] =
    useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);

  const displayedProducts = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? [...products]
        : products.filter(
            (product) =>
              product.category.toLowerCase() ===
              selectedCategory.toLowerCase()
          );

    if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, sortOption]);

  const getSortLabel = () => {
    if (sortOption === "low-high") {
      return "Price: Low to High";
    }

    if (sortOption === "high-low") {
      return "Price: High to Low";
    }

    return "Sort by";
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    setSortOpen(false);
  };

  return (
    <section className="bg-white py-16">
      <div className="container-main">
        <div className="mb-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
              Browse Collection
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#2f2928]">
              All Products
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              {displayedProducts.length}{" "}
              {displayedProducts.length === 1
                ? "product"
                : "products"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#f1e4df] bg-[#fff8f4] p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    className={`rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "border-[#d98186] bg-[#d98186] text-white shadow-sm"
                        : "border-[#eadad6] bg-white text-[#2f2928] shadow-sm hover:-translate-y-0.5 hover:border-[#d98186] hover:text-[#d98186] hover:shadow-md"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[220px]">
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen((current) => !current)
                  }
                  className="flex w-full items-center justify-between rounded-full border border-[#eadad6] bg-white px-5 py-3 text-sm font-medium text-[#2f2928] shadow-sm transition-all duration-200 hover:border-[#d98186] hover:shadow-md"
                >
                  <span>{getSortLabel()}</span>

                  <ChevronDown
                    size={17}
                    className={`text-[#d98186] transition-transform duration-200 ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[#eadad6] bg-white shadow-xl">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("default")
                      }
                      className={`block w-full px-5 py-3 text-left text-sm transition ${
                        sortOption === "default"
                          ? "bg-[#fff0ef] font-medium text-[#d98186]"
                          : "text-[#2f2928] hover:bg-[#fff0ef] hover:text-[#d98186]"
                      }`}
                    >
                      Sort by
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSort("low-high")
                      }
                      className={`block w-full border-t border-[#f3e7e3] px-5 py-3 text-left text-sm transition ${
                        sortOption === "low-high"
                          ? "bg-[#fff0ef] font-medium text-[#d98186]"
                          : "text-[#2f2928] hover:bg-[#fff0ef] hover:text-[#d98186]"
                      }`}
                    >
                      Price: Low to High
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleSort("high-low")
                      }
                      className={`block w-full border-t border-[#f3e7e3] px-5 py-3 text-left text-sm transition ${
                        sortOption === "high-low"
                          ? "bg-[#fff0ef] font-medium text-[#d98186]"
                          : "text-[#2f2928] hover:bg-[#fff0ef] hover:text-[#d98186]"
                      }`}
                    >
                      Price: High to Low
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#fff8f4] py-20 text-center">
            <p className="font-serif text-2xl text-[#2f2928]">
              No products found
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Products for this category will be added soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}