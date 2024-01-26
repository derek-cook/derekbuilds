import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "~/components/ThemeProvider";
import dynamic from "next/dynamic";
import { cn } from "~/lib/utils";

const DynamicAblyProvider = dynamic(
  () => import("~/components/realtime/ClientProviders"),
  {
    ssr: false,
  },
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Pools",
  description: "Pools is a realtime chat app built with Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
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
              <DynamicAblyProvider>
                <main className="flex min-h-screen flex-col">{children}</main>
                <footer className=""></footer>
              </DynamicAblyProvider>
            </TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
