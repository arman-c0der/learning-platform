import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button, buttonVariants } from "@/components/ui/button";

import { EnrollCourse } from "@/components/enroll-course";

const CourseCard = ({ course }) => {
    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-purple-900/40 bg-[#0f0720] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_12px_36px_-10px_rgba(168,85,247,0.35)]">
            <Link key={course.id} href={`/courses/${course.id}`}>
                <div>
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={`/assets/images/courses/${course?.thumbnail}`}
                            alt={course?.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0720] via-transparent to-transparent opacity-80" />

                        {course?.category?.title && (
                            <span className="absolute left-3 top-3 rounded-full border border-purple-700/50 bg-[#0a0512]/80 px-3 py-1 text-[11px] font-medium text-purple-300 backdrop-blur-sm">
                                {course.category.title}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 p-4">
                        <h3 className="line-clamp-2 text-base font-semibold text-purple-100 transition-colors group-hover:text-white">
                            {course?.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-purple-300/60">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>{course?.modules?.length} Chapters</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="mt-auto flex items-center justify-between border-t border-purple-900/40 px-4 py-3">
                <p className="text-sm font-semibold text-purple-200">
                    {formatPrice(course?.price)}
                </p>
                <EnrollCourse
                    asLink={true}
                    courseId={course.id}
                    courseTitle={course.title}
                    coursePrice={course.price}
                />
            </div>
        </div>
    );
};

export default CourseCard;