import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Video } from "lucide-react";

import CourseLessonList from "./CourseLessonList";

const CourseModuleList = ({ module }) => {
  return (
    <AccordionItem
      className="overflow-hidden rounded-xl border border-purple-900/40 bg-[#0f0720] data-[state=open]:border-purple-700/50"
      value={module.id}
    >
      <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold text-purple-100 hover:text-white hover:no-underline [&[data-state=open]]:text-white [&>svg]:text-purple-400">
        {module?.title}
      </AccordionTrigger>

      <AccordionContent className="border-t border-purple-900/40 px-5 pb-5 pt-0">
        {/* Header */}
        <div className="mb-5 mt-4 flex flex-wrap items-center gap-x-5 text-sm text-purple-300/70">
          <span className="flex items-center gap-1.5">
            <Video className="h-4 w-4 text-purple-400" />
            {(module?.duration / 60).toPrecision(2)} Hours
          </span>
        </div>

        {/* Lesson List */}
        <div className="space-y-3">
          {module?.lessonIds?.map((lessonId) => (
            <CourseLessonList key={lessonId} lessonId={lessonId} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CourseModuleList;