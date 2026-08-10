import Header from "@/components/layout/Header";
import ShopProducts from "@/components/shop/ShopProducts";

export default function ShopPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="border-b border-[#f1e4df] bg-[#fff8f4] py-16">
          <div className="container-main text-center">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#d98186]">
              THREADCRAFT AIRA
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#2f2928] md:text-5xl">
              Shop Our Collection
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-600">
              Explore handmade embroidered pieces, personalized gifts, and
              custom designs created with care.
            </p>
          </div>
        </section>

        <ShopProducts />
      </main>
    </>
  );
}