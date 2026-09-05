'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
export default function HeroSection(){
  return(
     <section className="hero-section">
                    <div className="hero-container">
    
                        <motion.div
                            aria-hidden="true"
                            className="hero-gradient-wrapper"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="hero-gradient" />
                        </motion.div>
    
                        {/* Welcome Badge */}
                        <motion.span
                            className="welcome-badge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                        >
                            Hey, Welcome
                        </motion.span>
    
                        {/* Hero Title */}
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.4,
                                ease: "easeOut",
                            }}
                        >
                            Learn Today, Lead Tomorrow.
                        </motion.h1>
    
                        {/* Hero Description */}
                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.6,
                                ease: "easeOut",
                            }}
                        >
                            You don&apos;t understand anything until you learn it
                            more than one way.
                        </motion.p>
    
                        {/* Buttons */}
                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.6,
                                ease: "easeOut",
                            }}
                        >
                            <Link
                                href="/courses"
                                className={cn(
                                    buttonVariants({ size: "lg" })
                                )}
                            >
                                Explore Now
                            </Link>
    
                            <Link
                                href="/register/instructor"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    })
                                )}
                            >
                                Become An Instructor
                            </Link>
                        </motion.div>
                    </div>
                </section>
  )
}