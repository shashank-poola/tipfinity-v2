'use client';
import { Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SidebarDemo2 } from "@/components/side2";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current path

  const isHomePage = pathname === "/"; // Check if it's the root page

  return (
    <html lang="en">
      <body
        className={`${sora.variable} antialiased`}
        style={{ fontFamily: 'var(--font-sora)', backgroundColor: '#E0E0E0' }}
      >
        <Providers>
          {isHomePage ? ( 
            children 
          ) : (
            <SidebarDemo2>
              <Toaster 
                position="top-right" 
                reverseOrder={false} 
                toastOptions={{
                  style: {
                    background: "#0E0E0E",
                    color: "#fff",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontFamily: 'var(--font-sora)',
                  },
                }}
              />
                {children}
            </SidebarDemo2>
          )}
        </Providers>
      </body>
    </html>
  );
}

