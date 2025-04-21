import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/main-components/Topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WalletX | Most secured your on go Web Wallet",
  description: "Secure, fast, and accessible from anywhere. WalletX makes managing your digital assets simple and stress-free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e4f6ff] text-white flex justify-center`}
      ><div className="container mx-8">
        <div>
          <Topbar/>
        </div>
        {children}
      </div>
      </body>
    </html>
  );
}
