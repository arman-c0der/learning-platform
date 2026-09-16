"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionTitle } from "@/components/section-title";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const courses = [
    {
        id: 1,
        title: "Reactive Accelerator",
        category: "Development",
        thumbnail: "/assets/images/courses/course_1.png",
        price: 49,
        chapters: 4,
        isPublished: false,
    },
];

const RelatedCourses = () => {
    const handleCourseClick = (isPublished) => {
        if (!isPublished) {
            toast.error(
                "This course is not published yet. Please check back later."
            );
            return;
        }
    };

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="mb-10">
                    <span className="mb-3 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
                        Keep Exploring
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Related{" "}
                        <span className="text-purple-400">Courses</span>
                    </h2>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="mx-auto w-full max-2xl:w-[90%]"
                >
                    <CarouselPrevious className="border-purple-800/50 bg-[#0f0720] text-purple-300 hover:bg-purple-950 hover:text-white" />
                    <CarouselNext className="border-purple-800/50 bg-[#0f0720] text-purple-300 hover:bg-purple-950 hover:text-white" />
                    <CarouselContent className="py-2">
                        {courses.map((course) => (
                            <CarouselItem
                                key={course.id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div
                                    role="button"
                                    onClick={() =>
                                        handleCourseClick(course.isPublished)
                                    }
                                    className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-purple-900/40 bg-[#0f0720] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_12px_36px_-10px_rgba(168,85,247,0.35)]"
                                >
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            fill
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0720] via-transparent to-transparent opacity-80" />

                                        <span className="absolute left-3 top-3 rounded-full border border-purple-700/50 bg-[#0a0512]/80 px-3 py-1 text-[11px] font-medium text-purple-300 backdrop-blur-sm">
                                            {course.category}
                                        </span>

                                        {!course.isPublished && (
                                            <span className="absolute right-3 top-3 rounded-full border border-purple-700/50 bg-[#0a0512]/80 px-3 py-1 text-[11px] font-medium text-purple-300/70 backdrop-blur-sm">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col gap-2 p-4">
                                        <h3 className="line-clamp-2 text-base font-semibold text-purple-100 transition-colors group-hover:text-white">
                                            {course.title}
                                        </h3>

                                        <div className="flex items-center gap-1.5 text-xs text-purple-300/60">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            <span>{course.chapters} Chapters</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-purple-900/40 px-4 py-3">
                                        <p className="text-sm font-semibold text-purple-200">
                                            {formatPrice(course.price)}
                                        </p>

                                        <Button
                                            variant="ghost"
                                            className="h-7 gap-1 text-xs text-purple-300 hover:bg-purple-950/60 hover:text-purple-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCourseClick(
                                                    course.isPublished
                                                );
                                            }}
                                        >
                                            Enroll
                                            <ArrowRight className="w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default RelatedCourses;