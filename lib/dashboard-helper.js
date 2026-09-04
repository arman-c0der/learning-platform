import { auth } from "@/auth";
import { getUserByEmail, getUserDetails } from "@/queries/users";
import {
  getCourseDetailsByInstructor,
  getCourseDetails,
} from "@/queries/courses";
import { getAReport } from "@/queries/reports";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateReviewData = async (reviews) => {
  const populatedReviews = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user?._id);

      review["studentName"] =
        `${student?.firstName ?? ""} ${student?.lastName ?? ""}`.trim();

      return review;
    })
  );

  return populatedReviews;
};

const populateEnrollmentData = async (enrollments) => {
  const populatedEnrollments = await Promise.all(
    enrollments.map(async (enrollment) => {

      // =====================================
      // 1. Get Student Information
      // =====================================

      const studentId = enrollment?.student?.toString();

      ("STUDENT ID:", studentId);

      const student = await getUserDetails(studentId);

      ("STUDENT DETAILS:", student);

      enrollment["studentName"] =
  `${student?.first_name ?? ""} ${student?.last_name ?? ""}`.trim();
      enrollment["studentEmail"] = student?.email ?? "";


      // =====================================
      // 2. Get Report
      // =====================================

      const courseId = enrollment?.course?.toString();

      const filter = {
        course: courseId,
        student: studentId,
      };

      const report = await getAReport(filter);


      // =====================================
      // 3. Default Progress & Quiz Mark
      // =====================================

      enrollment["progress"] = 0;
      enrollment["quizMark"] = 0;


      // =====================================
      // 4. Calculate Progress & Quiz Mark
      // =====================================

      if (report) {

        const course = await getCourseDetails(courseId);

        const totalModules =
          course?.modules?.length || 0;

        const totalCompletedModules =
          report?.totalCompletedModeules?.length || 0;

        const progress =
          totalModules > 0
            ? (totalCompletedModules / totalModules) * 100
            : 0;

        enrollment["progress"] = progress;


        // =====================================
        // Quiz Mark
        // =====================================

        const quizzes =
          report?.quizAssessment?.assessments || [];

        const quizzesTaken =
          quizzes.filter((q) => q.attempted);

        const totalCorrect = quizzesTaken
          .map((quiz) => {
            const options = quiz?.options || [];

            return options.filter(
              (option) =>
                option?.isCorrect === true &&
                option?.isSelected === true
            );
          })
          .filter((elem) => elem.length > 0)
          .flat();

        enrollment["quizMark"] =
          totalCorrect.length * 5;
      }

      return enrollment;
    })
  );

  return replaceMongoIdInArray(populatedEnrollments);
};


export async function getInstructorDashboardData(dataType) {
  try {
    const session = await auth();

    const instructor = await getUserByEmail(
      session?.user?.email
    );

    const data = await getCourseDetailsByInstructor(
      instructor?.id,
      true
    );
    ("Instructor Dashboard Data:", data);
   



    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;

      case REVIEW_DATA:
        return populateReviewData(data?.reviews);

      case ENROLLMENT_DATA:
        return populateEnrollmentData(
          data?.enrollments
        );

      default:
        return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}