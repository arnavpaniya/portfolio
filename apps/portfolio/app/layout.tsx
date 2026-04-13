import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const orbitron = localFont({
  src: "./fonts/Orbitron-Bold.ttf",
  variable: "--font-display",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter_18pt-Regular.ttf",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arnav Paniya",
  description: "Portfolio system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
