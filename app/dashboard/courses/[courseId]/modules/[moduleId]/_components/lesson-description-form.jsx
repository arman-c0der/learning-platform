"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateLesson } from "@/app/actions/lesson";

const formSchema = z.object({
  description: z.string().min(1),
});

export const LessonDescriptionForm = ({
  initialData,
  courseId,
  lessonId,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData?.description);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await updateLesson(lessonId, values);
      setDescription(values.description);
      toast.success("Lesson updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-purple-900/40 bg-[#0f0720] p-4">
      <div className="flex items-center justify-between font-medium text-purple-100">
        Chapter Description
        <Button
          variant="ghost"
          onClick={toggleEdit}
          className="text-purple-300 hover:bg-purple-950/40 hover:text-purple-100"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "mt-2 text-sm text-purple-200",
            !description && "italic text-purple-300/50"
          )}
        >
          {!description && "No description"}
          {description && <Preview value={description} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-500"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};