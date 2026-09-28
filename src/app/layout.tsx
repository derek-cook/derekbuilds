import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { env } from "~/env.mjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Derek Cook",
  description:
    "Frontend-focused software engineer building realtime systems, accessible products, and high-traffic web apps.",
  metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
  openGraph: {
    title: "Derek Cook",
    description:
      "Frontend-focused software engineer building realtime systems, accessible products, and high-traffic web apps.",
    url: env.NEXT_PUBLIC_WEBSITE_URL,
    siteName: "Derek Cook",
    type: "website",
  },
  twitter: {
    title: "Derek Cook",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-[#0b0c10] font-sans antialiased ${inter.variable}`}>
        <div className="flex min-h-dvh flex-col">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
