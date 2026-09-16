"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { createCourse } from "@/app/actions/course";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required!",
  }),
  description: z.string().min(1, {
    message: "Description is required!",
  }),
});

const AddCourse = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const course = await createCourse(values);
      router.push(`/dashboard/courses/${course?._id}`);
      toast.success("Course created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-5xl items-center justify-center p-6">
      <div className="w-[536px] max-w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create a New Course</h1>
          <p className="mt-1 text-sm text-purple-300/60">
            Give your course a title and a short description to get started
          </p>
        </div>

        <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 shadow-[0_8px_30px_-10px_rgba(168,85,247,0.15)] sm:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-100">
                      Course Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'Reactive Accelerator'"
                        className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-100">
                      Course Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Course overview"
                        className="resize-none border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-purple-100">
                      Write a brief description of your course
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-3 pt-2">
                <Link href="/dashboard/courses">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-purple-800 bg-transparent text-purple-100 hover:bg-purple-950 hover:text-purple-100"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="bg-purple-600 text-white hover:bg-purple-500"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;