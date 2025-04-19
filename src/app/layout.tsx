import "@/styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "Notion-style portfolio with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans leading-relaxed tracking-tight">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 pt-24 pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
