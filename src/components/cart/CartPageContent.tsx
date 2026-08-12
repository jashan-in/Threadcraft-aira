"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";

export default function CartPageContent() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [showLoginPopup, setShowLoginPopup] =
    useState(false);

  const handleCheckout = () => {
    if (!isSignedIn) {
      setShowLoginPopup(true);
      return;
    }

    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <section className="container-main py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0ef]">
            <ShoppingBag
              size={30}
              className="text-[#d98186]"
            />
          </div>

          <h1 className="mt-6 font-serif text-4xl text-[#2f2928]">
            Your bag is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Add something beautiful to your bag and it
            will appear here.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-[#d98186] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#bd656b]"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container-main py-12 md:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
            Shopping Bag
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#2f2928]">
            Your Bag
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            {cartCount}{" "}
            {cartCount === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.7fr_0.8fr]">
          {/* CART ITEMS */}

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="grid gap-5 rounded-2xl border border-[#f0e2de] bg-white p-4 sm:grid-cols-[150px_1fr]"
              >
                {/* PRODUCT IMAGE */}

                <Link
                  href={`/product/${item.slug}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f7ece6]"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* PRODUCT INFO */}

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                        >
                          <h2 className="font-serif text-xl text-[#2f2928] hover:text-[#d98186]">
                            {item.name}
                          </h2>
                        </Link>

                        <p className="mt-2 text-sm font-semibold text-[#2f2928]">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item.cartItemId
                          )
                        }
                        aria-label="Remove item"
                        className="rounded-full p-2 text-neutral-400 transition hover:bg-[#fff0ef] hover:text-[#d98186]"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* CUSTOMIZATION */}

                    <div className="mt-5 grid gap-2 text-sm text-neutral-500 sm:grid-cols-2">
                      <p>
                        Size:{" "}
                        <span className="font-medium text-[#2f2928]">
                          {item.size}
                        </span>
                      </p>

                      <p>
                        Colour:{" "}
                        <span className="font-medium text-[#2f2928]">
                          {item.colour}
                        </span>
                      </p>

                      <p>
                        Embroidery:{" "}
                        <span className="font-medium text-[#2f2928]">
                          {
                            item.embroideryLocation
                          }
                        </span>
                      </p>

                      {item.customText && (
                        <p>
                          Text:{" "}
                          <span className="font-medium text-[#2f2928]">
                            &quot;
                            {item.customText}
                            &quot;
                          </span>
                        </p>
                      )}
                    </div>

                    {item.uploadedFileName && (
                      <p className="mt-3 text-xs text-neutral-500">
                        Design:{" "}
                        <span className="font-medium">
                          {
                            item.uploadedFileName
                          }
                        </span>
                      </p>
                    )}

                    {item.notes && (
                      <div className="mt-4 rounded-xl bg-[#fff8f4] p-3 text-xs leading-5 text-neutral-600">
                        <span className="font-semibold">
                          Instructions:
                        </span>{" "}
                        {item.notes}
                      </div>
                    )}
                  </div>

                  {/* QUANTITY */}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#f3e7e3] pt-5">
                    <div className="flex items-center rounded-full border border-[#eadad6]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId,
                            Math.max(
                              1,
                              item.quantity - 1
                            )
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-l-full transition hover:bg-[#fff0ef]"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId,
                            item.quantity + 1
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-r-full transition hover:bg-[#fff0ef]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="font-semibold text-[#2f2928]">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}

          <aside>
            <div className="sticky top-32 rounded-2xl border border-[#f0e2de] bg-[#fff8f4] p-6">
              <h2 className="font-serif text-2xl text-[#2f2928]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>
                    Subtotal ({cartCount}{" "}
                    {cartCount === 1
                      ? "item"
                      : "items"}
                    )
                  </span>

                  <span className="font-medium text-[#2f2928]">
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>

                  <span>
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-[#eadad6] pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-lg font-semibold text-[#d98186]">
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-7 w-full rounded-full bg-[#d98186] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#bd656b]"
              >
                PROCEED TO CHECKOUT
              </button>

              <Link
                href="/shop"
                className="mt-3 block w-full rounded-full border border-[#eadad6] bg-white px-6 py-3.5 text-center text-sm font-medium text-[#2f2928] transition hover:border-[#d98186] hover:text-[#d98186]"
              >
                CONTINUE SHOPPING
              </Link>

              <div className="mt-6 space-y-2 text-xs text-neutral-500">
                <p>🔒 Secure checkout</p>
                <p>🌸 Handmade with care</p>
                <p>
                  🎁 Custom orders prepared specially
                  for you
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* LOGIN REQUIRED POPUP */}

      {showLoginPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0ef] text-2xl">
              🌸
            </div>

            <h2 className="mt-5 font-serif text-2xl text-[#2f2928]">
              Almost there
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Please log in or create an account
              before continuing to checkout.
            </p>

            <p className="mt-2 text-xs text-neutral-400">
              Your cart will stay saved while you
              sign in.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="/sign-in?redirect_url=/checkout"
                className="rounded-full bg-[#d98186] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#bd656b]"
              >
                LOGIN OR CREATE ACCOUNT
              </Link>

              <button
                type="button"
                onClick={() =>
                  setShowLoginPopup(false)
                }
                className="rounded-full border border-[#eadad6] px-6 py-3.5 text-sm font-medium transition hover:border-[#d98186] hover:text-[#d98186]"
              >
                CONTINUE BROWSING
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}