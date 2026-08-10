import Link from "next/link";

const categories = [
  {
    title: "Handkerchiefs",
    emoji: "🌸",
    href: "/shop?category=handkerchiefs",
  },
  {
    title: "Shirts",
    emoji: "👕",
    href: "/shop?category=shirts",
  },
  {
    title: "Hoodies",
    emoji: "🧥",
    href: "/shop?category=hoodies",
  },
  {
    title: "Custom Gifts",
    emoji: "🎁",
    href: "/gifts",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-20">
      <div className="container-main">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d98186]">
            DISCOVER
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#2f2928]">
            Shop by Category
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group overflow-hidden rounded-xl border border-[#f1e4df] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-64 items-center justify-center bg-[#f8ece8] text-7xl">
                {category.emoji}
              </div>

              <div className="p-5 text-center">
                <h3 className="font-serif text-lg text-[#2f2928]">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs font-medium text-[#d98186]">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}