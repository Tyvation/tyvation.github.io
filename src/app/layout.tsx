import "@/styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Test Portfolio",
  description: "Notion-style portfolio with Next.js",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" >
      <body className="bg-background text-foreground font-sans leading-relaxed tracking-tight">
        <main className="max-w-3xl mx-auto px-4 pt-24 pb-12 bg-transparent">{children}</main>
        <Footer />
        <Navbar />
      </body>
    </html>
  );
}
