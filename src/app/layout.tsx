import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "~/components/ThemeProvider";
import { cn } from "~/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Derek Builds AI",
  description: "What I'm working on",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Derek Builds AI",
    description: "What I'm working on",
    url: "https://derekbuildsai.ai",
    siteName: "Derek Builds AI",
    images: [
      {
        url: "https://derekbuilds.ai/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Derek Builds AI",
      },
    ],
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
        className={cn(
          "h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
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
            </TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
