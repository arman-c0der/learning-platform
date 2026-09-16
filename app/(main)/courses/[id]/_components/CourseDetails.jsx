import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMyDate } from "@/lib/date";

import CourseOverview from "./CourseOverview";
import CourseCurriculam from "./CourseCurriculam";
import CourseInstructor from "./CourseInstructor";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

const CourseDetails = ({ course }) => {
    const lastModifiedDate = course?.modifiedOn
        ? formatMyDate(course.modifiedOn)
        : "";

    return (
        <section className="py-8 md:py-12 lg:py-16">
            <div className="container">
                <div className="mx-auto max-w-3xl text-center">
                    {course?.category?.title && (
                        <span className="inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-purple-300">
                            {course.category.title}
                        </span>
                    )}

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                        {course?.title}
                    </h3>

                    <p className="mt-3 text-sm text-purple-300/60 sm:text-base">
                        {course?.subtitle}
                    </p>

                    {/* Instructor + last updated */}
                    <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                        <div className="flex items-center gap-2.5 rounded-full border border-purple-900/40 bg-[#0f0720] py-1.5 pl-1.5 pr-4">
                            <Image
                                className="h-9 w-9 rounded-full border border-purple-800/50 object-cover"
                                src={course?.instructor?.profilePicture}
                                alt={course?.instructor?.firstName}
                                width={36}
                                height={36}
                            />
                            <p className="text-sm font-medium text-purple-100">
                                {course?.instructor?.firstName}{" "}
                                {course?.instructor?.lastName}
                            </p>
                        </div>

                        {lastModifiedDate && (
                            <div className="flex items-center gap-2 text-sm text-purple-300/60">
                                <CalendarDays className="h-4 w-4 text-purple-400" />
                                <span>Last Updated: {lastModifiedDate}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="mx-auto mt-10 max-w-4xl">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mx-auto grid w-full max-w-[520px] grid-cols-3 rounded-xl border border-purple-900/40 bg-[#0f0720] p-1">
                            <TabsTrigger
                                value="overview"
                                className="rounded-lg text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="curriculum"
                                className="rounded-lg text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                            >
                                Curriculum
                            </TabsTrigger>
                            <TabsTrigger
                                value="instructor"
                                className="rounded-lg text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                            >
                                Instructor
                            </TabsTrigger>
                        </TabsList>

                        <div className="mt-8 rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 sm:p-8">
                            <TabsContent value="overview" className="mt-0">
                                <CourseOverview course={course} />
                            </TabsContent>
                            <TabsContent value="curriculum" className="mt-0">
                                <CourseCurriculam course={course} />
                            </TabsContent>
                            <TabsContent value="instructor" className="mt-0">
                                <CourseInstructor course={course} />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;