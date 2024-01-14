import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ClientProviders } from "~/components/ClientProviders";

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
      <body className={`font-sans ${inter.variable}`}>
        <ClerkProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ClientProviders>
              <div className="flex min-h-screen flex-col bg-noisyGradientLight bg-cover text-white dark:bg-noisyGradientDark ">
                {children}
                <footer className=""></footer>
              </div>
            </ClientProviders>
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
