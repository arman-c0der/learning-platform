import { SectionTitle } from "@/components/section-title";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";
import CourseCard from "./courses/_components/CourseCard";

const HomePage = async () => {
    const courses = await getCourseList();
    const categories = await getCategories();

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div
                        aria-hidden="true"
                        className="hero-gradient-wrapper"
                    >
                        <div className="hero-gradient" />
                    </div>

                    <span className="welcome-badge">
                        Hey, Welcome
                    </span>

                    <h1 className="hero-title">
                        Learn Today, Lead Tomorrow.
                    </h1>

                    <p className="hero-description">
                        You don&apos;t understand anything until you learn it
                        more than one way.
                    </p>

                    <div className="hero-actions">
                        <Link
                            href="/courses"
                            className={cn(buttonVariants({ size: "lg" }))}
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
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="content-section">
                <div className="section-header">
                    <SectionTitle>Categories</SectionTitle>

                    <Link href="/categories" className="browse-link">
                        Browse All
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>

                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link
                            href={`/categories/${category.id}`}
                            key={category.id}
                            className="category-card"
                        >
                            <div className="category-content">
                                <div className="category-icon-wrap">
                                    <Image
                                        src={`/assets/images/categories/${category.thumbnail}`}
                                        alt={category.title}
                                        width={56}
                                        height={56}
                                    />
                                </div>

                                <h3 className="category-title">
                                    {category.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="content-section">
                <div className="section-header">
                    <SectionTitle>Courses</SectionTitle>

                    <Link href="/courses" className="browse-link">
                        Browse All
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>

                <div className="courses-grid">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default HomePage;