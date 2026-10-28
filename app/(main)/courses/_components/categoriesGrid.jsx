"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 },
    },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CategoriesGrid = ({ categories }) => {
    return (
        <motion.div
            className="grid gap-5"
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 240px))",
                justifyContent: "center",
            }}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            {categories.map((category) => (
                <motion.div key={category.id} variants={item}>
                    <Link
                        href={`/categories/${category.id}`}
                        className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_8px_30px_-8px_rgba(168,85,247,0.35)]"
                    >
                        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30 blur-2xl" />
                        </div>

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-800/40 bg-purple-950/40 transition-all duration-300 group-hover:scale-105 group-hover:border-purple-500/50 group-hover:bg-purple-900/50">
                            <Image
                                src={`/assets/images/categories/${category.thumbnail}`}
                                alt={category.title}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>

                        <h3 className="text-sm font-semibold capitalize text-purple-100 transition-colors group-hover:text-white">
                            {category.title}
                        </h3>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CategoriesGrid;