import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from "react";
import { Providers } from "@/app/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Sentient Markets | AI Trading & Investment Copilot",
  description:
    "Sentient Markets is an intelligent trading copilot that fuses market data, sentiment analytics, and agentic automation to design, backtest, and execute strategies with risk-aware insights."
};

export const viewport: Viewport = {
  themeColor: "#0F172A"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-slate-950 text-white min-h-screen">
        <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
