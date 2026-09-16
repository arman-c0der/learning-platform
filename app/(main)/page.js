import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";
import CourseCard from "./courses/_components/CourseCard";
import HeroSection from "@/components/Hero-section";

const HomePage = async () => {
    const courses = await getCourseList();
    const categories = await getCategories();

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Categories Section */}
            <section id="categories" className="relative py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="mb-3 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
                                Explore
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Browse{" "}
                                <span className="text-purple-400">
                                    Categories
                                </span>
                            </h2>
                            <p className="mt-3 max-w-md text-sm text-purple-300/60">
                                Explore courses across a wide range of topics
                            </p>
                        </div>

                        <Link
                            href="/categories"
                            className="group flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-purple-300 transition-colors hover:text-purple-100"
                        >
                            Browse All
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div
                        className="grid gap-5"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(220px, 1fr))",
                        }}
                    >
                        {categories.map((category) => (
                            <Link
                                href={`/categories/${category.id}`}
                                key={category.id}
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="relative py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="mb-3 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
                                Learn
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Featured{" "}
                                <span className="text-purple-400">
                                    Courses
                                </span>
                            </h2>
                            <p className="mt-3 max-w-md text-sm text-purple-300/60">
                                Hand-picked courses to help you get started
                            </p>
                        </div>

                        <Link
                            href="/courses"
                            className="group flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-purple-300 transition-colors hover:text-purple-100"
                        >
                            Browse All
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div
                        className="grid gap-6"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(280px, 320px))",
                            justifyContent: "center",
                        }}
                    >
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;