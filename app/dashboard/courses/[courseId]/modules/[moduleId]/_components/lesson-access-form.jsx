"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateLesson } from "@/app/actions/lesson";

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const LessonAccessForm = ({ initialData, courseId, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [free, setFree] = useState(initialData?.isFree || false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !free,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const payload = {};
      if (values.isFree) {
        payload["access"] = "public";
      } else {
        payload["access"] = "private";
      }
      await updateLesson(lessonId, payload);
      setFree(values.isFree);
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
        Lesson access
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
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "mt-2 text-sm text-purple-200",
            !free && "italic text-purple-300/50"
          )}
        >
          {free ? (
            <>This chapter is free for preview</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-purple-900/40 bg-[#0a0512] p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-purple-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription className="text-purple-300/70">
                      Check this box if you want to make this chapter free
                      for preview
                    </FormDescription>
                  </div>
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