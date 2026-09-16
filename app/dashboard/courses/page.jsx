import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getInstructorDashboardData, COURSE_DATA } from "@/lib/dashboard-helper";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const dynamic = "force-dynamic";

const CoursesPage = async () => {
  const courses = await getInstructorDashboardData(COURSE_DATA);
  const coursesWithId = replaceMongoIdInArray(courses);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Courses</h1>
        <p className="mt-1 text-sm text-purple-100">
          Manage all your courses in one place
        </p>
      </div>

      <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-4 sm:p-6">
        <DataTable columns={columns} data={coursesWithId} />
      </div>
    </div>
  );
};

export default CoursesPage;