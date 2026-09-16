import { Presentation } from "lucide-react";
import { UsersRound } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Star } from "lucide-react";
import Image from "next/image";
import { getCourseDetailsByInstructor } from "@/queries/courses";

const CourseInstructor = async ({ course }) => {
    const instructor = course?.instructor;

    const fullName = `${instructor?.firstName} ${instructor?.lastName}`;
    const courseDetailsByInstructor = await getCourseDetailsByInstructor(
        instructor.id
    );

    const stats = [
        {
            icon: Presentation,
            label: `${courseDetailsByInstructor?.courses} Course(s)`,
        },
        {
            icon: UsersRound,
            label: `${courseDetailsByInstructor?.enrollments} Student Learned`,
        },
        {
            icon: MessageSquare,
            label: `${courseDetailsByInstructor?.reviews} Reviews`,
        },
        {
            icon: Star,
            label: `${courseDetailsByInstructor?.ratings} Average Rating`,
        },
    ];

    return (
        <div className="rounded-xl border border-purple-900/40 bg-[#0a0512] p-6 sm:p-8">
            <div className="mb-8 md:flex md:gap-x-8">
                <div className="mb-5 h-[280px] w-[240px] max-w-full flex-none overflow-hidden rounded-xl border border-purple-900/40 md:mb-0">
                    <Image
                        src={instructor?.profilePicture}
                        alt={fullName}
                        className="h-full w-full object-cover"
                        width={240}
                        height={280}
                    />
                </div>

                <div className="flex-1">
                    <div className="max-w-[320px]">
                        <h4 className="text-2xl font-bold leading-tight text-white sm:text-[32px] sm:leading-[1.2]">
                            {fullName}
                        </h4>
                        <div className="mb-6 mt-1 font-medium text-purple-400">
                            {instructor?.designation}
                        </div>
                        <ul className="space-y-4">
                            {stats.map(({ icon: Icon, label }, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-purple-200"
                                >
                                    <div className="flex-none rounded-full bg-purple-950/60 p-1.5 text-purple-400">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>{label}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <p className="border-t border-purple-900/40 pt-6 leading-relaxed text-purple-300/70">
                {instructor?.bio}
            </p>
        </div>
    );
};

export default CourseInstructor;