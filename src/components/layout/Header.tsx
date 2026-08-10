"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[#f8dddd] px-4 py-2 text-center text-xs text-[#6f5552]">
        Handmade embroidery with love 🌸 · Custom orders · Gift wrapping available
      </div>

      <header className="sticky top-0 z-50 border-b border-[#f0e2de] bg-white/95 backdrop-blur">
        <div className="container-main flex h-20 items-center justify-between">
          <Link href="/" className="font-serif text-2xl italic text-[#a96f6a]">
            Threadcraft Aira
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <Link href="/shop" className="hover:text-[#d98186]">
              NEW
            </Link>

            <Link href="/shop" className="hover:text-[#d98186]">
              SHOP
            </Link>

            <Link href="/customize" className="hover:text-[#d98186]">
              CUSTOMIZE
            </Link>

            <Link href="/gifts" className="hover:text-[#d98186]">
              GIFTS
            </Link>

            <Link href="/#our-work" className="hover:text-[#d98186]">
              OUR WORK
            </Link>

            <Link href="/#about" className="hover:text-[#d98186]">
              ABOUT
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="hidden hover:text-[#d98186] sm:block"
            >
              <Search size={19} />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className="hover:text-[#d98186]"
            >
              <User size={19} />
            </Link>

            <button
              type="button"
              aria-label="Wishlist"
              className="hidden hover:text-[#d98186] sm:block"
            >
              <Heart size={19} />
            </button>

            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="relative hover:text-[#d98186]"
            >
              <ShoppingBag size={20} />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d98186] text-[10px] text-white">
                0
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#f0e2de] bg-white lg:hidden">
            <nav className="container-main flex flex-col py-5 text-sm font-medium">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#f5ebe8] py-3"
              >
                NEW
              </Link>

              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#f5ebe8] py-3"
              >
                SHOP
              </Link>

              <Link
                href="/customize"
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#f5ebe8] py-3"
              >
                CUSTOMIZE
              </Link>

              <Link
                href="/gifts"
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#f5ebe8] py-3"
              >
                GIFTS
              </Link>

              <Link
                href="/#our-work"
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#f5ebe8] py-3"
              >
                OUR WORK
              </Link>

              <Link
                href="/#about"
                onClick={() => setMenuOpen(false)}
                className="py-3"
              >
                ABOUT
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}