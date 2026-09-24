import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aman Virk | Portfolio",
  description: "Software Development Engineer & AI Specialist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        {/* Ambient Background Spotlights */}
        <div className="ambient-background">
          <div className="ambient-glow glow-top-left"></div>
          <div className="ambient-glow glow-bottom-right"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
