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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/video-player";
import { formatDuration } from "@/lib/date";
import { updateLesson } from "@/app/actions/lesson";

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Required",
  }),
  duration: z.string().min(1, {
    message: "Required",
  }),
});

export const VideoUrlForm = ({ initialData, courseId, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState({
    url: initialData?.url,
    duration: formatDuration(initialData?.duration),
  });
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const payload = { video_url: values?.url };

      const duration = values?.duration?.trim();
      const splitted = duration.split(":").map(Number);

      if (splitted.length === 3 && splitted.every((n) => !isNaN(n))) {
        payload.duration =
          splitted[0] * 3600 + splitted[1] * 60 + splitted[2];
      } else {
        toast.error("Duration must be in HH:MM:SS format");
        return;
      }

      await updateLesson(lessonId, payload);

      setState({ url: values.url, duration: values.duration });
      toast.success("Lesson updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("updateLesson error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-purple-900/40 bg-[#0f0720] p-4">
      <div className="flex items-center justify-between font-medium text-purple-100">
        Video URL
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
              Edit URL
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="mt-2 text-sm text-purple-200">{state.url}</p>
          <div className="mt-6 overflow-hidden rounded-lg border border-purple-900/40">
            <VideoPlayer url={state.url} />
          </div>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            {/* url */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300/80">
                    Video URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300/80">
                    Video Duration
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '10:30:18'"
                      className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                      {...field}
                    />
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