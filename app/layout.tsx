import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import DisableDevTools from "@/components/Protection/DisableDevTools";
import Chatbot from "@/components/Chatbot/Chatbot";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"]
});

export const metadata: Metadata = {
  title: "Agency Template",
  description: "We create pleaseant experiences for your customers."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DisableDevTools />
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
