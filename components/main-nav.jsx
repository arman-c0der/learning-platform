"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "@/components/logo";
import Image from "next/image";
import { X } from "lucide-react";
import { Command } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function MainNav({ items, children }) {
    const { data: session, status } = useSession();

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    if (session?.error === "RefreshAccessTokenError") {
        redirect("/login");
    }

    useEffect(() => {
        if (status !== "authenticated") return;

        async function fetchMe() {
            try {
                const response = await fetch("/api/me");
                const data = await response.json();
                setLoggedInUser(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchMe();
    }, [status]);

    return (
        <div className=" w-full ">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-6 lg:gap-10">
                    <Link href="/" className="flex items-center">
                        <Logo />
                    </Link>
                    {items?.length ? (
                        <nav className="hidden gap-6 lg:flex">
                            {items?.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.disabled ? "#" : item.href}
                                    className={cn(
                                        "group relative flex items-center text-sm font-medium text-white transition-colors hover:text-purple-100",
                                        item.disabled && "cursor-not-allowed opacity-60"
                                    )}
                                >
                                    {item.title}
                                    <span className="pointer-events-none absolute -bottom-1 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-purple-400 transition-all duration-300 ease-out group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>
                    ) : null}

                    {showMobileMenu && items && (
                        <MobileNav items={items}>{children}</MobileNav>
                    )}
                </div>

                <nav className="flex items-center gap-3">
                    {status === "unauthenticated" && (
                        <div className="items-center gap-3 hidden lg:flex">
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
                                    align="end"
                                    className="w-56 mt-4 bg-[#0f0720] border border-purple-950 text-purple-300"
                                >
                                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-950 focus:bg-purple-950">
                                        <Link href="/register/student">
                                            Student
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-950 focus:bg-purple-950">
                                        <Link href="/register/instructor">
                                            Instructor
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    {status === "authenticated" && (
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
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-purple-500 focus:bg-purple-500"
                                    asChild
                                >
                                    <Link href="/account">Profile</Link>
                                </DropdownMenuItem>
                                {loggedInUser?.role === "instructor" && (
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-purple-500 focus:bg-purple-500"
                                        asChild
                                    >
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                )}
                                {loggedInUser?.role === "student" && (
                                    <DropdownMenuItem
                                        className="cursor-pointer hover:bg-purple-500 focus:bg-purple-500"
                                        asChild
                                    >
                                        <Link href="/account/enrolled-courses">
                                            My Courses
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    className="cursor-pointer hover:bg-purple-500 focus:bg-purple-500"
                                    asChild
                                >
                                    <Link
                                        href="#"
                                        onClick={() => {
                                            signOut();
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <button
                        className="flex items-center space-x-2 lg:hidden text-purple-300 hover:text-purple-100"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X /> : <Menu />}
                    </button>
                </nav>
            </div>
        </div>
    );
}