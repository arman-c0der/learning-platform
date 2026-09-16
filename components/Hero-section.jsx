"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className=" relative overflow-hidden bg-[#0a0512] py-24 sm:py-32">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Purple blur glow background */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px]" />
        </motion.div>

        {/* Welcome Badge */}
        <motion.span
          className="mb-6 rounded-full border border-purple-800/50 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Hey, Welcome
        </motion.span>

        {/* Hero Title */}
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <span className="text-white">Learn Today, </span>

        <span className="text-purple-400">
  Lead
  <br />
  Tomorrow.
</span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          className="mt-6 max-w-xl text-base text-purple-200/70 sm:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          You don&apos;t understand anything until you learn it more than one
          way.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/courses"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-purple-600 text-white hover:bg-purple-500 border-0"
            )}
          >
            Explore Now
          </Link>

          <Link
            href="/register/instructor"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-purple-700 bg-transparent text-white hover:bg-purple-950/50 hover:text-white"
            )}
          >
            Become An Instructor
          </Link>
        </motion.div>
      </div>
    </section>
  );
}