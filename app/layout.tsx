import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech News",
  description: "Technology Blogging App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <NextTopLoader color="rgb(11, 2, 245)" height={5} />

          <div className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl min-h-screen flex flex-col px-8">
            <Navbar />
            <div className="flex-auto">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
