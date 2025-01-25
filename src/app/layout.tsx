import "./globals.css";
import {
  ethnocentric,
  ibmPlexMono,
  loraSerif,
  outfitSans,
} from "@/assets/fonts/index.config";
import { Toaster } from "@/components/ui/toaster";
import { NODE_ENV } from "@/configs/env.config";
import SessionProvider from "@/providers/session-provider";
import { SolanaWalletProvider } from "@/providers/solana-wallet-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlutonAI",
  description: "Your smart AI Agent for automated trading",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={NODE_ENV === "production"}>
      <body
        className={`${outfitSans.variable} ${loraSerif.variable} ${ethnocentric.variable} ${ibmPlexMono.variable} bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem>
          <SessionProvider>
            <SolanaWalletProvider>{children}</SolanaWalletProvider>
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
