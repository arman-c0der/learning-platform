import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import Testimonials from "./_components/Tesimonials";
import RelatedCourses from "./_components/RelatedCourses";
import CourseDetails from "./_components/CourseDetails";

import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

import { notFound } from "next/navigation";

const SingleCoursePage = async ({ params }) => {
    const { id } = await params;

    const course = await getCourseDetails(id);

    if (!course) {
        notFound();
    }

    return (
        <>
            <CourseDetailsIntro course={course} />

            <CourseDetails course={course} />

            {course.testimonials?.length > 0 && (
                <Testimonials
                    testimonials={replaceMongoIdInArray(course.testimonials)}
                />
            )}

            <RelatedCourses />
        </>
    );
};

export default SingleCoursePage;