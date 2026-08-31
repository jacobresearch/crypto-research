import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jacob Joseph — Research Analyst",
  description:
    "Tracking narratives across digital assets, macro markets, and emerging financial themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#1A1A1A] font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#E0DDD8]">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <p className="text-xs text-[#AAA]">
              © {new Date().getFullYear()} Jacob Joseph. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
