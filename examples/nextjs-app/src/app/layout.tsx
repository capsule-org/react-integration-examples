import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./index.css";

export const metadata: Metadata = {
  title: "Capsule SDK Integration Example",
  description: "Capsule SDK integration example using Next.js",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-eval' https://js.stripe.com https://crypto-js.stripe.com; worker-src 'self' blob:;",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff6700",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://crypto-js.stripe.com" />
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this Capsule SDK example.
        </noscript>
        {children}
      </body>
      <Script src="https://js.stripe.com/v3/" strategy="lazyOnload" />
      <Script
        src="https://crypto-js.stripe.com/crypto-onramp-outer.js"
        strategy="lazyOnload"
      />
    </html>
  );
}
