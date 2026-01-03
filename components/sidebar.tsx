"use client";
/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusIcon, SearchIcon, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { Creator } from "@/types";


export function SidebarDemo2({children}:any) {

  const { wallet } = useWallet();
  useEffect(() => {
    getCreatorFromDb();
  }, [wallet?.adapter.publicKey]);

  const [creator, setCreator] = useState<Creator | null>(null);

  async function getCreatorFromDb() {
    const res = await axios.post(`/api/getcreator`, { publicKey: wallet?.adapter.publicKey?.toString() });
    setCreator(res.data);
  }

   const WalletMultiButtonDynamic = dynamic(
      async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
      { ssr: false }
    );

  const links = [
    { label: "Explore", icon: <SearchIcon className="h-5 w-5" />, page: "explore", href: "/explore" },
    { label: "Profile", icon: <IconUserBolt className="h-5 w-5" />, page: "profile", href: "/profile" },
  ]
  const links2 = [
    { label: "Become a creator", icon: <PlusIcon className="h-5 w-5" />, page: "creator", href: "/creator" }
  ]
  const router = useRouter();

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <LogoWithToggle />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <button key={idx} onClick={() => router.push(link.href)}>
                  <SidebarLink className="hover:bg-[#393839] p-2 rounded-md" link={link} />
                </button>
              ))}
              {!creator?.id && (
                <button onClick={() => router.push('/creator')}>
                  <SidebarLink className="hover:bg-[#393839] p-2 rounded-md" link={links2[0]} />
                </button>
              )}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
     <div className="h-full w-full gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 overflow-auto">
           <div className="flex justify-end">
             <div className="fixed z-50">
               <WalletMultiButtonDynamic />
             </div>
           </div>
           <div>
           {children}
           </div>
         </div>
    </div>
  );
}

export const Logo = () => (
  <Link href="#" className="relative z-20 flex items-center py-1">
    <motion.img 
      src="/logo/whitelogo.png" 
      alt="Tipfinity" 
      className="h-12 w-25"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    />
  </Link>
);

export const LogoWithToggle = () => {
  const { open, setOpen } = useSidebar();
  
  return (
    <div className="relative z-20 flex items-center justify-between py-1">
      <Link href="#" className="flex items-center">
        <motion.img 
          src="/logo/whitelogo.png" 
          alt="Tipfinity" 
          className="h-12 w-25"
          initial={{ opacity: 0 }} 
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <button 
        onClick={() => setOpen(!open)}
        className="hidden md:flex p-2 rounded-lg hover:bg-neutral-800 transition-colors"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};
