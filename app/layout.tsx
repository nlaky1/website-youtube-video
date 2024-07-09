
import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins(
  { subsets: ["latin"],
    weight: '400'
}
  );

export const metadata: Metadata = {
  title: "Soluqube | Software Development Agency - Websites, E-commerce, Mobile Apps",
  description: "Soluqube is a leading software development agency specializing in website development, e-commerce store development, mobile application development, Flutter, and cross-platform apps. Contact us to elevate your digital presence.",
  keywords: "software development agency, website development, e-commerce store development, mobile application development, Flutter, cross-platform apps",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      
      suppressHydrationWarning={true}
      className={font.className}>
        <Analytics />
        {children}
        
        </body>
    </html>
  );
}
