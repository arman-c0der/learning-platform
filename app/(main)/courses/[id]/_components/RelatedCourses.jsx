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
            toast.error("This course is not published yet. Please check back later.");
            return;
        }
    };

    return (
        <section className="">
            <div className="container">
                <SectionTitle className="mb-6">Related Courses</SectionTitle>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="max-2xl:w-[90%] w-full mx-auto"
                >
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselContent>
                        {courses.map((course) => (
                            <CarouselItem
                                key={course.id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div
                                    role="button"
                                    onClick={() => handleCourseClick(course.isPublished)}
                                    className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full cursor-pointer"
                                >
                                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                        <Image
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="object-cover"
                                            fill
                                        />
                                    </div>
                                    <div className="flex flex-col pt-2">
                                        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                                            {course.title}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {course.category}
                                        </p>
                                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                                            <div className="flex items-center gap-x-1 text-slate-500">
                                                <div>
                                                    <BookOpen className="w-4" />
                                                </div>
                                                <span>{course.chapters} Chapters</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-md md:text-sm font-medium text-slate-700">
                                                {formatPrice(course.price)}
                                            </p>

                                            <Button
                                                variant="ghost"
                                                className="text-xs text-sky-700 h-7 gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCourseClick(course.isPublished);
                                                }}
                                            >
                                                Enroll
                                                <ArrowRight className="w-3" />
                                            </Button>
                                        </div>
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