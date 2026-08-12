import { redirect } from "next/navigation";

import Header from "@/components/layout/Header";
import CheckoutReview from "@/components/checkout/CheckoutReview";

import { getDbUser } from "@/lib/getDbUser";
import { prisma } from "@/lib/prisma";

type ReviewPageProps = {
  searchParams: Promise<{
    addressId?: string;
  }>;
};

export default async function ReviewPage({
  searchParams,
}: ReviewPageProps) {
  const user = await getDbUser();

  if (!user) {
    redirect(
      "/sign-in?redirect_url=/checkout"
    );
  }

  const { addressId } =
    await searchParams;

  if (!addressId) {
    redirect("/checkout");
  }

  const address =
    await prisma.address.findFirst({
      where: {
        id: addressId,
        userId: user.id,
      },
    });

  if (!address) {
    redirect("/checkout");
  }

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="container-main py-12 md:py-16">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
              Checkout
            </p>

            <h1 className="mt-2 font-serif text-4xl text-[#2f2928]">
              Review Your Order
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Check your items and delivery
              information before continuing.
            </p>
          </div>

          <CheckoutReview
            address={{
              id: address.id,
              fullName: address.fullName,
              phone: address.phone,
              addressLine1:
                address.addressLine1,
              addressLine2:
                address.addressLine2,
              city: address.city,
              state: address.state,
              postalCode:
                address.postalCode,
              country: address.country,
            }}
          />
        </section>
      </main>
    </>
  );
}