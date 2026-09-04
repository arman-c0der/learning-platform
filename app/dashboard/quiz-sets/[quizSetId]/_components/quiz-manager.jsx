"use client";

import { useState } from "react";
import AlertBanner from "@/components/alert-banner";
import { CircleCheck, Circle } from "lucide-react";
import { QuizCardActions } from "./quiz-card-actions";
import { QuizForm } from "./add-quiz-form";

// quizzes: [{ id, question, description, options: [{label, isTrue}] }]
export const QuizManager = ({ quizzes, quizSetId, isPublished = false, children }) => {
  const [editingQuiz, setEditingQuiz] = useState(null); // null => "add" mode
 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
      {/* Quiz List */}
      <div className="max-lg:order-2">
        <h2 className="text-xl mb-6">Quiz List</h2>
 
        {quizzes.length === 0 && (
          <AlertBanner
            label="No Quiz are in the set, add some using the form above."
            variant="warning"
            className="rounded mb-6"
          />
        )}
 
        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border ${
                editingQuiz?.id === quiz.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <h2 className="mb-3">{quiz.question}</h2>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quiz.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="py-1.5 rounded-sm text-sm flex items-center gap-1 text-gray-600"
                  >
                    {option.isTrue ? (
                      <CircleCheck className="size-4 text-emerald-500" />
                    ) : (
                      <Circle className="size-4" />
                    )}
                    <p>{option.label}</p>
                  </div>
                ))}
              </div>
 
              <div className="flex items-center justify-end gap-2 mt-6">
                <QuizCardActions
                  quiz={quiz}
                  quizSetId={quizSetId}
                  isPublished={isPublished}
                  onEdit={() => setEditingQuiz(quiz)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Right column: title form (passed as children) + add/edit quiz form */}
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="text-xl">Customize your quiz set</h2>
        </div>
 
        {children}
 
        <div className="max-w-[800px]">
          <QuizForm
            quizSetId={quizSetId}
            initialData={editingQuiz}
            onDone={() => setEditingQuiz(null)}
          />
        </div>
      </div>
    </div>
  );
};