import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mile Vaganan Events",
  description: "Premium Wedding & Event Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ivory text-maroon-dark min-h-screen">{children}</body>
    </html>
  );
}
