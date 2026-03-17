import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejas Srinivasulu — Full Stack Engineer",
  description:
    "Full Stack Engineer building scalable systems and clean interfaces. React, Node.js, GraphQL, AWS.",
  openGraph: {
    title: "Tejas Srinivasulu — Full Stack Engineer",
    description: "Full Stack Engineer at ToyStack AI, Bangalore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
