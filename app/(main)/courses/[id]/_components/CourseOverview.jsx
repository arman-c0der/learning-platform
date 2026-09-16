import { CheckCheck } from "lucide-react";

const CourseOverview = ({ course }) => {
    return (
        <>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
                Course Description
            </h3>
            <p className="mt-4 leading-relaxed text-purple-300/70">
                {course?.description}
            </p>

            <div className="mt-8 space-y-6 rounded-xl border border-purple-900/40 bg-[#0a0512] p-6 sm:p-8">
                <h4 className="text-lg font-semibold text-white sm:text-xl">
                    What You Will Learn?
                </h4>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {course?.learning &&
                        course?.learning.map((learning, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="mt-0.5 flex-none rounded-full bg-purple-950/60 p-1 text-purple-400">
                                    <CheckCheck className="h-4 w-4" />
                                </div>
                                <div className="flex-1 text-sm text-purple-200">
                                    {learning}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
};

export default CourseOverview;