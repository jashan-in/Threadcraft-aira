"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SavedAddress = {
  id: string;
  fullName: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type AddressSelectionProps = {
  addresses: SavedAddress[];
};

export default function AddressSelection({
  addresses,
}: AddressSelectionProps) {
  const router = useRouter();

  const defaultAddress =
    addresses.find((address) => address.isDefault) ??
    addresses[0];

  const [selectedAddressId, setSelectedAddressId] =
    useState(defaultAddress?.id ?? "");

  const continueWithSavedAddress = () => {
    if (!selectedAddressId) {
      return;
    }

    router.push(
      `/checkout/review?addressId=${selectedAddressId}`
    );
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        const selected =
          selectedAddressId === address.id;

        return (
          <button
            key={address.id}
            type="button"
            onClick={() =>
              setSelectedAddressId(address.id)
            }
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selected
                ? "border-[#d98186] bg-[#fff8f4]"
                : "border-[#eadad6] bg-white hover:border-[#d9aaa8]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  selected
                    ? "border-[#d98186]"
                    : "border-neutral-300"
                }`}
              >
                {selected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#d98186]" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-serif text-lg text-[#2f2928]">
                    {address.fullName}
                  </p>

                  {address.isDefault && (
                    <span className="rounded-full bg-[#fff0ef] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#d98186]">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {address.addressLine1}

                  {address.addressLine2 &&
                    `, ${address.addressLine2}`}

                  <br />

                  {address.city}, {address.state},{" "}
                  {address.postalCode}

                  <br />

                  {address.country}
                </p>

                {address.phone && (
                  <p className="mt-2 text-xs text-neutral-400">
                    {address.phone}
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}

      <button
        type="button"
        onClick={continueWithSavedAddress}
        disabled={!selectedAddressId}
        className="mt-3 w-full rounded-full bg-[#d98186] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#bd656b] disabled:cursor-not-allowed disabled:opacity-50"
      >
        USE SELECTED ADDRESS
      </button>
    </div>
  );
}