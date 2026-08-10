import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import ProductsSection from "@/components/home/ProductsSection";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <CategorySection />
        <ProductsSection />
      </main>
    </>
  );
}