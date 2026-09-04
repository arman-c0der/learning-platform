// "use client";

// import { Trash } from "lucide-react";

// import { Button } from "@/components/ui/button";

// export const QuizSetAction = ({ isPublished = false }) => {
//   return (
//     <div className="flex items-center gap-x-2">
//       <Button variant="outline" size="sm">
//         {isPublished ? "Unpublish" : "Publish"}
//       </Button>

//       <Button size="sm">
//         <Trash className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// };

"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateQuizSet, deleteQuizSet } from "@/app/actions/quiz";

export const QuizSetAction = ({ quizSetId, isPublished = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTogglePublish = async () => {
    try {
      setIsLoading(true);
      await updateQuizSet(quizSetId, { active: !isPublished });
      toast.success(isPublished ? "Quiz set unpublished" : "Quiz set published");
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    // published থাকা অবস্থায় delete করতে দেওয়া হচ্ছে না — আগে unpublish করতে হবে
    if (isPublished) {
      toast.error("Unpublish the quiz set before deleting it.");
      return;
    }

    try {
      setIsLoading(true);
      await deleteQuizSet(quizSetId);
      toast.success("Quiz set deleted");
      router.push("/quiz-sets"); // ⚠️ তোমার আসল listing route দিয়ে বদলে দাও
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={isLoading}
        onClick={handleTogglePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" disabled={isLoading} onClick={handleDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};