import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import ProductDetails from "@/components/product/ProductDetails";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-white">
        <div className="container-main py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="sticky top-32">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f7ece6]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <ProductDetails product={product} />
          </div>
        </div>
      </main>
    </>
  );
}