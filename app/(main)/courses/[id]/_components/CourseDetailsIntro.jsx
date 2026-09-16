import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { BookOpen, PlayCircle } from "lucide-react";

import { EnrollCourse } from "@/components/enroll-course";

import { hasEnrollmentForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

const CourseDetailsIntro = async ({ course }) => {
    const session = await auth();

    const loggedInUser = await getUserByEmail(session?.user?.email);

    const hasEnrollment = await hasEnrollmentForCourse(
        course?.id,
        loggedInUser?.id
    );

    return (
        <div className="overflow-x-hidden bg-[#0a0512]">
            <section className="relative pt-16 sm:pt-24">
                {/* Ambient purple glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden"
                >
                    <div className="h-[400px] w-[600px] rounded-full bg-purple-600/25 blur-[120px]" />
                </div>

                <div className="container">
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        {course?.category?.title && (
                            <span className="mb-4 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-purple-300">
                                {course.category.title}
                            </span>
                        )}

                        <h1 className="text-base font-medium text-purple-300/70 sm:text-lg">
                            {course?.subtitle}
                        </h1>

                        <p className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                            <span className="relative inline-block">
                                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-400 opacity-20 blur-2xl filter" />
                                <span className="relative">
                                    {course?.title}
                                </span>
                            </span>
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {hasEnrollment ? (
                                <Link
                                    href={`/courses/${course?.id}/lesson`}
                                    className={cn(
                                        buttonVariants({ size: "lg" }),
                                        "bg-purple-600 text-white hover:bg-purple-500 border-0"
                                    )}
                                >
                                    Access Course
                                </Link>
                            ) : (
                                <EnrollCourse courseId={course?.id} />
                            )}

                            <Link
                                href=""
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    }),
                                    "gap-2 border-purple-700 bg-transparent text-purple-300 hover:bg-purple-950/50 hover:text-purple-100"
                                )}
                            >
                                <PlayCircle className="h-4 w-4" />
                                See Intro
                            </Link>
                        </div>
                    </div>
                </div>

              <div className="mt-12 pb-16">
    <div className="container">
        <div className="relative mx-auto lg:max-w-3xl">
            {/* Gradient glow behind card */}
            <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-purple-600/20 via-fuchsia-500/20 to-purple-600/20 blur-2xl"
            />

            {/* Card frame */}
            <div className="rounded-2xl border border-purple-900/50 bg-[#0f0720] p-3 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)] sm:p-4">
                {/* Browser-style top bar */}
                <div className="mb-3 flex items-center gap-2 px-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-lg border border-purple-900/40">
                    <Image
                        className="w-full object-cover"
                        width={768}
                        height={463}
                        src={`/assets/images/courses/${course?.thumbnail}`}
                        alt={course?.title || "Course thumbnail"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0512]/30 via-transparent to-transparent" />
                </div>
            </div>
        </div>
    </div>
</div>
            </section>
        </div>
    );
};

export default CourseDetailsIntro;