import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CornerAnimations from "../components/CornerAnimations";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mile Vaganan Events | Premium Wedding & Event Management",
  description: "Crafting Royal Weddings and unforgettable events with elegance and perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ivory text-maroon-dark min-h-screen font-sans">
        <CornerAnimations />
        {children}
      </body>
    </html>
  );
}
