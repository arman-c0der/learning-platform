"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { MobileNav } from "@/components/mobile-nav";
import {Logo} from "@/components/logo";
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
    // `status` is the reliable signal: "loading" | "authenticated" | "unauthenticated".
    // Relying on a separate state that starts as null is what caused the flash,
    // because on first render that state is falsy even while a session actually exists.
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
                (err);
            }
        }

        fetchMe();
    }, [status]);

    return (
        <>
            <div className="flex gap-6 lg:gap-10">
                <Link href="/">
                   <Logo/>
                </Link>
                {items?.length ? (
                    <nav className="hidden gap-6 lg:flex">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}

                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>
            <nav className="flex items-center gap-3">
                {/* Only render Login/Register once we're sure there's no session.
                    While status === "loading", show nothing here at all — that's
                    what stops the flash on reload. */}
                {status === "unauthenticated" && (
                    <div className="items-center gap-3 hidden lg:flex">
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ size: "sm" }),
                                "px-4"
                            )}
                        >
                            Login
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Register
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 mt-4"
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/register/student">
                                        Student
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
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
                            <div className="cursor-pointer">
                                <Avatar>
                                    <AvatarImage
                                        src={loggedInUser?.profilePicture}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4">
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link href="/account">Profile</Link>
                            </DropdownMenuItem>
                            {loggedInUser?.role === "instructor" && (
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    asChild
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                            )}
                            {loggedInUser?.role === "student" && (
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    asChild
                                >
                                    <Link href="/account/enrolled-courses">
                                        My Courses
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="cursor-pointer" asChild>
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
                    className="flex items-center space-x-2 lg:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
        </>
    );
}