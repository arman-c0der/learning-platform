"use client";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { SessionProvider } from "next-auth/react";

const navLinks = [
  { title: "Features", href: "/" },
  { title: "Pricing", href: "/" },
  { title: "Blog", href: "/" },
  { title: "Documentation", href: "/" },
];

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0512]">
      <header className="z-40 bg-[#0a0512]/80 backdrop-blur-md fixed top-0 left-0 right-0 border-b border-purple-950">
        <SessionProvider>
          <div className="container flex h-16 items-center justify-between">
            <MainNav items={navLinks} />
          </div>
        </SessionProvider>
      </header>
      <main className="flex-1 pt-16 flex flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
};
export default MainLayout;