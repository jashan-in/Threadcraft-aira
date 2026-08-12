import Header from "@/components/layout/Header";
import CartPageContent from "@/components/cart/CartPageContent";

export default function CartPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        <CartPageContent />
      </main>
    </>
  );
}