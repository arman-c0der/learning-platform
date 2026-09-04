import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getInstructorDashboardData, COURSE_DATA } from "@/lib/dashboard-helper";
import {replaceMongoIdInArray} from "@/lib/convertData";


const CoursesPage = async () => {
  const courses = await getInstructorDashboardData(COURSE_DATA);
  const coursesWithId = replaceMongoIdInArray(courses);
 // Log the courses data to check its structure

  return (
    <div className="p-6">
      <DataTable columns={columns} data={coursesWithId} />
    </div>
  );
};

export default CoursesPage;