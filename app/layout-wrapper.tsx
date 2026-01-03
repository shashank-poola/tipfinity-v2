'use client';
import { Providers } from "@/components/Providers";
import { SidebarDemo2 } from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
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
  );
}

