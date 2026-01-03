import { Sora } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "./layout-wrapper";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tipfinity",
  description: "Tipping on Solana. Tip your favorite creators instantly.",
  icons: {
    icon: "/header.png",
    shortcut: "/header.png",
    apple: "/header.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} antialiased`}
        style={{ fontFamily: 'var(--font-sora)', backgroundColor: '#E0E0E0' }}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

