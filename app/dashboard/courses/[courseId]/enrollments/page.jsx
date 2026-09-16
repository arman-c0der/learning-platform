import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { getInstructorDashboardData, ENROLLMENT_DATA } from "@/lib/dashboard-helper";

import { getCourseDetails } from "@/queries/courses";

const EnrollmentsPage = async ({ params }) => {
  const { courseId } = await params;
  const course = await getCourseDetails(courseId);
  const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);
  const enrollmentForCourse = allEnrollments.filter(
    (enrollment) => enrollment?.course.toString() == courseId
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <span className="mb-2 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
          Enrollments
        </span>
        <h2 className="text-2xl font-bold text-purple-100">
          {course?.title}
        </h2>
        <p className="mt-1 text-sm text-purple-100/60">
          {enrollmentForCourse.length} student
          {enrollmentForCourse.length !== 1 ? "s" : ""} enrolled in this
          course
        </p>
      </div>

      <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-4 sm:p-6">
        <DataTable columns={columns} data={enrollmentForCourse} />
      </div>
    </div>
  );
};

export default EnrollmentsPage;