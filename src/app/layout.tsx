import type { Metadata } from "next";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}