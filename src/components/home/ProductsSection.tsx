import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function ProductsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-main">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d98186]">
            SHOP
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#2f2928]">
            Our Products
          </h2>

          <p className="mt-3 text-sm text-neutral-500">
            Explore our handmade and personalized embroidery collection.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}