import { redirect } from "next/navigation";

import Header from "@/components/layout/Header";
import AddressSelection from "@/components/checkout/AddressSelection";

import { getDbUser } from "@/lib/getDbUser";
import { prisma } from "@/lib/prisma";

import { saveCheckoutAddress } from "./actions";

export default async function CheckoutPage() {
  const user = await getDbUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/checkout");
  }

  const addresses =
    await prisma.address.findMany({
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

  const fullName =
    [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ");

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="container-main py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
              Checkout
            </p>

            <h1 className="mt-2 font-serif text-4xl text-[#2f2928]">
              Delivery Details
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Choose where you&apos;d like your order
              delivered.
            </p>

            {/* Saved addresses */}

            {addresses.length > 0 && (
              <section className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
                  Saved Addresses
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#2f2928]">
                  Choose an address
                </h2>

                <div className="mt-5">
                  <AddressSelection
                    addresses={addresses.map(
                      (address) => ({
                        id: address.id,
                        fullName:
                          address.fullName,
                        phone: address.phone,
                        addressLine1:
                          address.addressLine1,
                        addressLine2:
                          address.addressLine2,
                        city: address.city,
                        state: address.state,
                        postalCode:
                          address.postalCode,
                        country:
                          address.country,
                        isDefault:
                          address.isDefault,
                      })
                    )}
                  />
                </div>

                <div className="my-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#eadad6]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
                    Or
                  </span>

                  <div className="h-px flex-1 bg-[#eadad6]" />
                </div>
              </section>
            )}

            {/* New Address */}

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
                New Address
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#2f2928]">
                Enter a new delivery address
              </h2>

              <div className="mt-5 rounded-3xl border border-[#f0e2de] bg-[#fff8f4] p-6 md:p-8">
                <form
                  action={saveCheckoutAddress}
                  className="space-y-6"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="fullName"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Full Name *
                      </label>

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        defaultValue={fullName}
                        placeholder="Enter your full name"
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-2 w-full cursor-not-allowed rounded-xl border border-[#eadad6] bg-neutral-50 px-4 py-3 text-sm text-neutral-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Phone
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Delivery contact number"
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="addressLine1"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Address *
                      </label>

                      <input
                        id="addressLine1"
                        name="addressLine1"
                        type="text"
                        required
                        placeholder="House number, street, area"
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="addressLine2"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Apartment / Landmark
                      </label>

                      <input
                        id="addressLine2"
                        name="addressLine2"
                        type="text"
                        placeholder="Optional"
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        City *
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        State / Province *
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Postal Code *
                      </label>

                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        required
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="text-sm font-medium text-[#2f2928]"
                      >
                        Country *
                      </label>

                      <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        defaultValue="India"
                        className="mt-2 w-full rounded-xl border border-[#eadad6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#d98186] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#bd656b]"
                  >
                    SAVE & USE THIS ADDRESS
                  </button>
                </form>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}