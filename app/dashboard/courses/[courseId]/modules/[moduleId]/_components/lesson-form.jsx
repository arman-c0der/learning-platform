"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LessonList } from "./lesson-list";
import { LessonModal } from "./lesson-modal";
import { getSlug } from "@/lib/convertData";

import { createLesson } from "@/app/actions/lesson";
import { reOrderLesson } from "@/app/actions/lesson";

const formSchema = z.object({
  title: z.string().min(1),
});

export const LessonForm = ({ initialData, moduleId, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lessons, setLessons] = useState(initialData);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [lessonToEdit, setLessonToEdit] = useState(null);

  const toggleCreating = () => setIsCreating((current) => !current);
  const toggleEditing = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("slug", getSlug(values.title));
      formData.append("moduleId", moduleId);
      formData.append("order", lessons.length);

      const lesson = await createLesson(formData);

      setLessons((lessons) => [
        ...lessons,
        {
          id: lesson?._id.toString(),
          title: values.title,
        },
      ]);
      toast.success("Lesson created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData) => {
    try {
      setIsUpdating(true);
      await reOrderLesson(updateData);
      toast.success("Lesson reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id) => {
    const foundLesson = lessons.find((lesson) => lesson.id === id);
    setLessonToEdit(foundLesson);
    setIsEditing(true);
  };

  return (
    <div className="relative mt-6 rounded-xl border border-purple-900/40 bg-[#0f0720] p-4">
      {isUpdating && (
        <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-xl bg-[#0a0512]/60 backdrop-blur-sm">
          <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium text-purple-100">
        Module Lessons
        <Button
          variant="ghost"
          onClick={toggleCreating}
          className="text-purple-300 hover:bg-purple-950/40 hover:text-purple-100"
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course...'"
                      className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="bg-purple-600 text-white hover:bg-purple-500"
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "mt-2 text-sm text-purple-200",
            !lessons?.length && "italic text-purple-300/50"
          )}
        >
          {!lessons?.length && "No Lesson"}
          <LessonList
            onEdit={onEdit}
            onReorder={onReorder}
            items={lessons || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 text-xs text-purple-300/50">
          Drag & Drop to reorder the lessons
        </p>
      )}
      <LessonModal
        open={isEditing}
        setOpen={setIsEditing}
        courseId={courseId}
        moduleId={moduleId}
        lesson={lessonToEdit}
        onClose={() => window.location.reload()}
      />
    </div>
  );
};