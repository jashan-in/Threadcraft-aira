import Link from "next/link";
import { redirect } from "next/navigation";

import Header from "@/components/layout/Header";
import { getDbUser } from "@/lib/getDbUser";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const user = await getDbUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/account");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const addresses = await prisma.address.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [
      {
        isDefault: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const displayName =
    [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ") || "Customer";

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="container-main py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
            My Account
          </p>

          <h1 className="mt-2 font-serif text-4xl text-[#2f2928]">
            Hi, {user.firstName || "there"}
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Manage your profile, saved addresses and orders.
          </p>

          {/* Profile */}

          <div className="mt-10 rounded-2xl border border-[#f0e2de] bg-[#fff8f4] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
              Profile
            </p>

            <h2 className="mt-4 font-serif text-xl text-[#2f2928]">
              {displayName}
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              {user.email}
            </p>
          </div>

          {/* Orders */}

          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
                  Orders
                </p>

                <h2 className="mt-2 font-serif text-3xl text-[#2f2928]">
                  My Orders
                </h2>
              </div>

              <span className="text-sm text-neutral-400">
                {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-[#f0e2de] p-8 text-center">
                <p className="font-serif text-xl text-[#2f2928]">
                  No orders yet
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  Your orders will appear here after checkout.
                </p>

                <Link
                  href="/shop"
                  className="mt-6 inline-block rounded-full bg-[#d98186] px-7 py-3 text-sm font-semibold text-white"
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-[#f0e2de] bg-white p-5 md:p-6"
                  >
                    <div className="flex flex-col gap-4 border-b border-[#f3e8e5] pb-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                          Order Number
                        </p>

                        <h3 className="mt-1 font-serif text-xl text-[#2f2928]">
                          {order.orderNumber}
                        </h3>

                        <p className="mt-1 text-xs text-neutral-400">
                          {order.createdAt.toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#fff0ef] px-3 py-1.5 text-xs font-semibold text-[#c46d72]">
                          {order.status.replaceAll("_", " ")}
                        </span>

                        <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-600">
                          Payment:{" "}
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between gap-5 text-sm"
                        >
                          <div>
                            <p className="font-medium text-[#2f2928]">
                              {item.productName}
                            </p>

                            <p className="mt-1 text-xs text-neutral-500">
                              Qty: {item.quantity}
                              {item.size
                                ? ` · Size: ${item.size}`
                                : ""}
                              {item.colour
                                ? ` · ${item.colour}`
                                : ""}
                            </p>
                          </div>

                          <p className="font-semibold">
                            ₹
                            {(
                              item.price * item.quantity
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-5 border-t border-[#f3e8e5] pt-5 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                          Delivery
                        </p>

                        <p className="mt-2 text-sm text-neutral-600">
                          {order.address.fullName}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-neutral-500">
                          {order.address.addressLine1}
                          {order.address.addressLine2
                            ? `, ${order.address.addressLine2}`
                            : ""}
                          <br />
                          {order.address.city},{" "}
                          {order.address.state},{" "}
                          {order.address.postalCode}
                          <br />
                          {order.address.country}
                        </p>
                      </div>

                      <div className="md:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                          Total
                        </p>

                        <p className="mt-2 font-serif text-2xl text-[#d98186]">
                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Saved Addresses */}

          <section className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
              Addresses
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#2f2928]">
              Saved Addresses
            </h2>

            {addresses.length === 0 ? (
              <p className="mt-5 text-sm text-neutral-500">
                You have not saved any addresses yet.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="rounded-2xl border border-[#f0e2de] p-5"
                  >
                    <div className="flex justify-between gap-4">
                      <h3 className="font-serif text-lg text-[#2f2928]">
                        {address.fullName}
                      </h3>

                      {address.isDefault && (
                        <span className="h-fit rounded-full bg-[#fff0ef] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#d98186]">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-neutral-500">
                      {address.addressLine1}

                      {address.addressLine2 && (
                        <>
                          <br />
                          {address.addressLine2}
                        </>
                      )}

                      <br />

                      {address.city}, {address.state}
                      <br />

                      {address.postalCode},{" "}
                      {address.country}

                      {address.phone && (
                        <>
                          <br />
                          {address.phone}
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}