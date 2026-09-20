import type { Metadata } from "next";
import { Oldenburg, Onest } from "next/font/google";
import "./globals.css";
import LayoutProvider from "./components/LayoutProvider"; // We wrap children in a client boundary

const oldenburg = Oldenburg({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oldenburg",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "KisanSetu",
  description: "The Digital Bridge for Every Farmer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oldenburg.variable} ${onest.variable}`}>
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
