import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";   
import "./globals.css";

export const metadata: Metadata = {
  title: "ACE — Construction machinery marketplace",
  description: "Find and rent construction machinery near you.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />                                    
      </body>
    </html>
  );
}