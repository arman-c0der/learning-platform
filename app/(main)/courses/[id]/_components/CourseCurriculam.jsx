import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { BookCheck } from "lucide-react";
import { Clock10 } from "lucide-react";
import { Radio } from "lucide-react";
import { Video } from "lucide-react";
import { NotepadText } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { SquarePlay } from "lucide-react";
import { Tv } from "lucide-react";
import { StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

import CourseModuleList from "./module/CourseModuleList";

const CourseCurriculam = ({ course }) => {
    const totalDuration =
        course?.modules?.reduce((total, module) => {
            const moduleDuration =
                module?.lessonIds?.reduce((acc, lesson) => {
                    return acc + (Number(lesson?.duration) || 0);
                }, 0) || 0;
            return total + moduleDuration;
        }, 0) || 0;

    return (
        <>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-5 text-sm text-purple-300/70">
                <span className="flex items-center gap-2 rounded-full border border-purple-900/40 bg-[#0a0512] px-4 py-2">
                    <BookCheck className="h-4 w-4 text-purple-400" />
                    {course?.modules?.length} Chapters
                </span>
                <span className="flex items-center gap-2 rounded-full border border-purple-900/40 bg-[#0a0512] px-4 py-2">
                    <Clock10 className="h-4 w-4 text-purple-400" />
                    {(totalDuration / 3600).toPrecision(2)} Hours
                </span>
            </div>

            <Accordion
                defaultValue={["item-1", "item-2", "item-3"]}
                type="multiple"
                className="w-full space-y-3"
            >
                {course?.modules &&
                    course?.modules.map((module) => (
                        <CourseModuleList key={module.id} module={module} />
                    ))}
            </Accordion>
        </>
    );
};

export default CourseCurriculam;