import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import { AuroraBackground } from "@/components/background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vercel",
  description: "Not for public use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuroraBackground>{children}</AuroraBackground>
      </body>
    </html>
  );
}
