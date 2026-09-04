import { getCoursesByCategory } from "@/queries/courses";
import CourseCard from "../../courses/_components/CourseCard";

const CategoryPage = async ({ params }) => {

    const { id } = await params;

    const courses = await getCoursesByCategory(id);

    return (
        <div className="p-5">

            <h1 className="text-2xl font-bold mb-6">
                Category Courses
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                    />
                ))}
            </div>

        </div>
    );
};

export default CategoryPage;