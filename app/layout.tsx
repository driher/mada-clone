import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // ✅ TAMBAH INI

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilmu Komunikasi",
  description: "Website resmi Prodi Ilmu Komunikasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-100">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        {/* ✅ FOOTER (selalu di bawah) */}
        <Footer />

      </body>
    </html>
  );
}