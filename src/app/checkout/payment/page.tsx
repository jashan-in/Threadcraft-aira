import { redirect } from "next/navigation";

import Header from "@/components/layout/Header";
import { getDbUser } from "@/lib/getDbUser";
import { prisma } from "@/lib/prisma";

type PaymentPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function PaymentPage({
  searchParams,
}: PaymentPageProps) {
  const user = await getDbUser();

  if (!user) {
    redirect(
      "/sign-in?redirect_url=/checkout"
    );
  }

  const { orderId } =
    await searchParams;

  if (!orderId) {
    redirect("/cart");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },

    include: {
      items: true,
      address: true,
    },
  });

  if (!order) {
    redirect("/cart");
  }

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="container-main py-16">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
              Payment
            </p>

            <h1 className="mt-2 font-serif text-4xl text-[#2f2928]">
              Complete Payment
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Order {order.orderNumber}
            </p>

            <div className="mt-10 rounded-3xl border border-[#f0e2de] bg-[#fff8f4] p-8">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">
                  Order Total
                </span>

                <span className="text-xl font-semibold text-[#d98186]">
                  ₹
                  {order.total.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="mt-6 rounded-xl bg-white p-5 text-center">
                <p className="font-serif text-xl text-[#2f2928]">
                  Payment setup comes next
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  We&apos;ll connect UPI and payment
                  processing here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}