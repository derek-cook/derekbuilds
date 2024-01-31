import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "~/components/ThemeProvider";
import { cn } from "~/lib/utils";
import { env } from "~/env.mjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Derek Cook",
  description: "What I'm working on",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
  openGraph: {
    title: "Derek Cook",
    description: "What I'm working on",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", inter.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              <main className="flex h-dvh flex-col">{children}</main>
              <footer className=""></footer>
              <Analytics />
              <SpeedInsights />
            </TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
