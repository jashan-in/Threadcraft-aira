import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#fff8f4]">
      <div className="container-main flex min-h-[480px] items-center py-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#c97b80]">
            Handmade Embroidery
          </p>

          <h1 className="font-serif text-5xl leading-tight text-[#2f2928] md:text-6xl">
            Little details,
            <span className="block italic text-[#d98186]">
              stitched with love.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600">
            Personalized embroidery made carefully for you and your special
            moments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded bg-[#d98186] px-7 py-3 text-sm font-semibold text-white hover:bg-[#bd656b]"
            >
              SHOP COLLECTION
            </Link>

            <Link
              href="/customize"
              className="rounded border border-[#d98186] px-7 py-3 text-sm font-semibold text-[#c46f75] hover:bg-[#fcebea]"
            >
              CUSTOMIZE YOURS
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-xs text-neutral-600">
            <span>🌸 Handmade with love</span>
            <span>🪡 Premium quality</span>
            <span>🎁 Perfect for gifts</span>
            <span>🚚 Delivery available</span>
          </div>
        </div>
      </div>
    </section>
  );
}