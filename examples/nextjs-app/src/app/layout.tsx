import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./index.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capsule Next.js Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src="https://js.stripe.com/v3/"></Script>
      <Script src="https://crypto-js.stripe.com/crypto-onramp-outer.js"></Script>
    </html>
  );
}
