"use client";
import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import { redirect } from "next/navigation";

export function MobileNav({ items, children }) {
  useLockBody();

  const { data: session } = useSession();

  if (session?.error === 'RefreshAccessTokenError') {
    redirect("/login")
  }

  const [loginSession, setLoginSession] = useState(null);

  useEffect(() => {
    setLoginSession(session);
  }, [session]);

  return (
    <div
      className={cn(
        "absolute right-4 top-16 z-30 w-64 max-h-[80vh] overflow-auto rounded-md shadow-md animate-in slide-in-from-top-5 lg:hidden bg-[#0a0512]"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-[#0f0720] p-4 text-purple-300 shadow-lg shadow-black/60 border border-purple-950">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium text-purple-300 transition-colors hover:text-purple-100 hover:no-underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              <span className="group relative inline-block">
                {item.title}
                <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-purple-400 transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </Link>
          ))}
        </nav>
        {!loginSession && (
          <div className="items-center gap-3 flex lg:hidden">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "sm" }),
                "px-4 bg-purple-600 hover:bg-purple-500 text-white border-0"
              )}
            >
              Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-800 text-purple-300 bg-transparent hover:bg-purple-950 hover:text-purple-100"
                >
                  Register
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-56 mt-4 bg-[#0f0720] border border-purple-950 text-purple-300"
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-purple-400 focus:bg-purple-500">
                  <Link href="/register/student">Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-purple-400 focus:bg-purple-500">
                  <Link href="/register/instructor">Instructor</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}