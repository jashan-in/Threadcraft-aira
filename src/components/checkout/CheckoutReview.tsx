"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createOrder } from "@/app/checkout/review/actions";
import { useCart } from "@/components/cart/CartProvider";

type Address = {
  id: string;
  fullName: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type CheckoutReviewProps = {
  address: Address;
};

export default function CheckoutReview({
  address,
}: CheckoutReviewProps) {
  const router = useRouter();

  const {
    cartItems,
    cartCount,
    cartTotal,
  } = useCart();

  const [creatingOrder, setCreatingOrder] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [checkoutKey, setCheckoutKey] =
    useState("");

  useEffect(() => {
    const storageKey =
      "threadcraft-checkout-key";

    let existingKey =
      sessionStorage.getItem(storageKey);

    if (!existingKey) {
      existingKey = crypto.randomUUID();

      sessionStorage.setItem(
        storageKey,
        existingKey
      );
    }

    setCheckoutKey(existingKey);
  }, []);

  const handleContinueToPayment = async () => {
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!checkoutKey) {
      setError(
        "Checkout is still loading. Please try again."
      );
      return;
    }

    try {
      setCreatingOrder(true);
      setError(null);

      const result = await createOrder(
        address.id,
        checkoutKey,
        cartItems
      );

      router.push(
        `/checkout/payment?orderId=${result.orderId}`
      );
    } catch (error) {
      console.error(error);

      setError(
        "We could not create your order. Please try again."
      );
    } finally {
      setCreatingOrder(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="rounded-3xl border border-[#f0e2de] bg-[#fff8f4] p-10 text-center">
        <h2 className="font-serif text-2xl text-[#2f2928]">
          Your bag is empty
        </h2>

        <p className="mt-3 text-sm text-neutral-500">
          Add products before continuing with checkout.
        </p>

        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-[#d98186] px-7 py-3 text-sm font-semibold text-white"
        >
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr]">
      <div>
        {/* Delivery */}

        <div className="rounded-2xl border border-[#f0e2de] bg-[#fff8f4] p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
                Delivery Address
              </p>

              <h2 className="mt-4 font-serif text-xl text-[#2f2928]">
                {address.fullName}
              </h2>

              <div className="mt-3 space-y-1 text-sm text-neutral-600">
                <p>{address.addressLine1}</p>

                {address.addressLine2 && (
                  <p>
                    {address.addressLine2}
                  </p>
                )}

                <p>
                  {address.city},{" "}
                  {address.state}
                </p>

                <p>
                  {address.postalCode},{" "}
                  {address.country}
                </p>

                {address.phone && (
                  <p className="pt-2">
                    Phone: {address.phone}
                  </p>
                )}
              </div>
            </div>

            <Link
              href="/checkout"
              className="text-xs font-semibold text-[#d98186] hover:underline"
            >
              CHANGE
            </Link>
          </div>
        </div>

        {/* Cart Items */}

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
            Your Items
          </p>

          <h2 className="mt-2 font-serif text-2xl text-[#2f2928]">
            Order Items
          </h2>

          <div className="mt-5 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="grid gap-4 rounded-2xl border border-[#f0e2de] p-4 sm:grid-cols-[110px_1fr]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f7ece6]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex justify-between gap-5">
                    <div>
                      <h3 className="font-serif text-lg text-[#2f2928]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold">
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-1 text-xs text-neutral-500 sm:grid-cols-2">
                    <p>
                      Size:{" "}
                      <span className="text-[#2f2928]">
                        {item.size}
                      </span>
                    </p>

                    <p>
                      Colour:{" "}
                      <span className="text-[#2f2928]">
                        {item.colour}
                      </span>
                    </p>

                    <p>
                      Embroidery:{" "}
                      <span className="text-[#2f2928]">
                        {
                          item.embroideryLocation
                        }
                      </span>
                    </p>

                    <p>
                      Quantity:{" "}
                      <span className="text-[#2f2928]">
                        {item.quantity}
                      </span>
                    </p>

                    {item.customText && (
                      <p className="sm:col-span-2">
                        Custom text:{" "}
                        <span className="text-[#2f2928]">
                          {
                            item.customText
                          }
                        </span>
                      </p>
                    )}

                    {item.notes && (
                      <p className="sm:col-span-2">
                        Instructions:{" "}
                        <span className="text-[#2f2928]">
                          {item.notes}
                        </span>
                      </p>
                    )}

                    {item.uploadedFileName && (
                      <p className="sm:col-span-2">
                        Design file:{" "}
                        <span className="text-[#2f2928]">
                          {
                            item.uploadedFileName
                          }
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}

      <aside>
        <div className="sticky top-32 rounded-2xl border border-[#f0e2de] bg-[#fff8f4] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
            Summary
          </p>

          <h2 className="mt-2 font-serif text-2xl text-[#2f2928]">
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

              <span>
                ₹
                {cartTotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>
                Shipping
              </span>

              <span>
                ₹0
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

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={
              handleContinueToPayment
            }
            disabled={
              creatingOrder ||
              !checkoutKey
            }
            className="mt-7 w-full rounded-full bg-[#d98186] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#bd656b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creatingOrder
              ? "CREATING ORDER..."
              : !checkoutKey
                ? "LOADING CHECKOUT..."
                : "CONTINUE TO PAYMENT"}
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-neutral-400">
            You will review payment
            details before being charged.
          </p>
        </div>
      </aside>
    </div>
  );
}