"use client";

import Link from "next/link";
import { X } from "lucide-react";

type LoginReminderModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LoginReminderModal({
  open,
  onClose,
}: LoginReminderModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-neutral-400 transition hover:text-[#d98186]"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0ef] text-2xl">
            🌸
          </div>

          <h2 className="mt-5 font-serif text-2xl text-[#2f2928]">
            Your item is in the bag
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-600">
            Log in or create an account to save your cart and access it later.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/sign-in?redirect_url=/cart"
              className="rounded-full bg-[#d98186] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#bd656b]"
            >
              LOGIN OR REGISTER
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#eadad6] bg-white px-6 py-3.5 text-sm font-medium text-[#2f2928] transition hover:border-[#d98186] hover:text-[#d98186]"
            >
              CONTINUE BROWSING
            </button>
          </div>

          <p className="mt-5 text-xs text-neutral-400">
            Your cart will stay saved on this device while you continue browsing.
          </p>
        </div>
      </div>
    </div>
  );
}