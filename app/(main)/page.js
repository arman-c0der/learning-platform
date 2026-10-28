import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";
import HeroSection from "@/components/Hero-section";
import CategoriesGrid from "./courses/_components/categoriesGrid";
import CoursesGrid from "./courses/_components/CoursesGrid";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const HomePage = async () => {
    const courses = await getCourseList();
    const categories = await getCategories();

    return (
        <>
            <HeroSection />

            <section id="categories" className="relative py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="mb-3 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
                                Explore
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Browse <span className="text-purple-400">Categories</span>
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

                    <CategoriesGrid categories={categories} />
                </div>
            </section>

            <section id="courses" className="relative py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="mb-3 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
                                Learn
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Featured <span className="text-purple-400">Courses</span>
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

                    <CoursesGrid courses={courses} />
                </div>
            </section>
        </>
    );
};

export default HomePage;