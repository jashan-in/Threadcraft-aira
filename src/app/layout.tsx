import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import CartProvider from "@/components/cart/CartProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Threadcraft Aira",
  description: "Handmade custom embroidery and personalized gifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}