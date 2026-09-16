"use client";

import { Logo } from "@/components/logo";
import { MobileSidebar } from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(`/api/me`);
        const data = await response.json();
        setLoggedInUser(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMe();
  }, []);

  return (
    <div className="flex h-full items-center border-b border-purple-950 bg-[#0a0512] p-4 shadow-lg shadow-black/40">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer ring-2 ring-purple-800 rounded-full hover:ring-purple-500 transition-all">
              <Avatar>
                <AvatarImage
                  src={loggedInUser?.profilePicture}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-purple-950 text-purple-300">
                  CN
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 mt-4 bg-[#0f0720] border border-purple-950 text-purple-300"
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-purple-950 focus:bg-purple-950">
              <Link
                href="#"
                className="w-full"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};