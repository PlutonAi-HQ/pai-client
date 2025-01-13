import "./globals.css";
import { ethnocentric, ibmPlexMono, loraSerif, outfitSans } from "@/assets/fonts/index.config";
// import { ThemeProvider } from "@/components/theme-provider";
import { SolanaWalletProvider } from "@/providers/solana-wallet-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlutonAI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.variable} ${loraSerif.variable} ${ethnocentric.variable} ${ibmPlexMono.variable} antialiased`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange> */}
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
