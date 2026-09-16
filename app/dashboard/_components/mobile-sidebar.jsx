"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 text-purple-300 transition hover:opacity-75 lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#0a0512] p-0 border-purple-950">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};