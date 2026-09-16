import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { getCourseDetailsByInstructor } from "@/queries/courses";

import { getUserByEmail } from "@/queries/users";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BookOpen, Users, DollarSign } from "lucide-react";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const instructor = await getUserByEmail(session.user.email);
  if (instructor?.role !== "instructor") redirect("/login");

  const courseStats = await getCourseDetailsByInstructor(instructor?.id);

  const stats = [
    {
      title: "Total Courses",
      value: courseStats?.courses,
      icon: BookOpen,
    },
    {
      title: "Total Enrollments",
      value: courseStats?.enrollments,
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: formatPrice(courseStats?.revenue),
      icon: DollarSign,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-purple-300/60">
          Welcome back, {instructor?.firstName}. Here&apos;s your overview.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ title, value, icon: Icon }, index) => (
          <Card
            key={index}
            className="border-purple-900/40 bg-[#0f0720] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/50 hover:shadow-[0_12px_36px_-10px_rgba(168,85,247,0.35)]"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300/70">
                {title}
              </CardTitle>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-950/60 text-purple-400">
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardPage;