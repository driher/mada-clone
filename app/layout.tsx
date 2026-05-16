import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import PWAInstall from "@/components/PWAInstall";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://komunikasi.uinsgd.ac.id"),
  title: "Ilkom UIN SGD Bandung",
  description: "Portal resmi Ilmu Komunikasi UIN Sunan Gunung Djati Bandung",
  icons: { icon: "/favicon-ico.ico" },
  openGraph: {
    title: "Ilkom UIN SGD",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ilkom UIN SGD",
  },
};

export const viewport: Viewport = {
  themeColor: "#ec4899",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>

        {/* ================= GOOGLE ANALYTICS 4 ================= */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FJ4R6P1CDB"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FJ4R6P1CDB', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

      </head>

      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">

        {/* ================= PWA ================= */}
        <PWAInstall />

        {/* ================= NAVBAR ================= */}
        <Navbar />

        {/* ================= CONTENT ================= */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="bg-white shadow-xl shadow-black/5 rounded-2xl border border-slate-100 overflow-hidden">
              {children}
            </div>

          </div>
        </main>

        {/* ================= FOOTER ================= */}
        <Footer />

      </body>
    </html>
  );
}