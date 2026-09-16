import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getAllQuizSets } from "@/queries/quizzes";

const QuizSets = async () => {
  const quizSets = await getAllQuizSets();
  const mappedQuizSets = quizSets.map((q) => {
    return {
      id: q.id,
      title: q.title,
      isPublished: q.active,
      totalQuiz: q.quizIds.length,
    };
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-100">Quiz Sets</h1>
        <p className="mt-1 text-sm text-purple-100/60">
          Manage all your quiz sets in one place
        </p>
      </div>

      <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-4 sm:p-6">
        <DataTable columns={columns} data={mappedQuizSets} />
      </div>
    </div>
  );
};

export default QuizSets;