// "use client";

// import * as z from "zod";
// // import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Label } from "@/components/ui/label";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { PlusCircle } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// import { addQuizToQuizSet } from "@/app/actions/quiz";

// const formSchema = z.object({
//   question: z
//     .string({
//       required_error: "Question is required",
//     })
//     .min(1, {
//       message: "Question is required",
//     }),
//   description: z
//     .string({
//       required_error: "Description is required",
//     })
//     .min(1, {
//       message: "Description is required",
//     }),
//   optionA: z.object({
//     label: z
//       .string({
//         required_error: "Option label is required",
//       })
//       .min(1, {
//         message: "Option label is required",
//       }),
//     isTrue: z.boolean().default(false),
//   }),
//   optionB: z.object({
//     label: z
//       .string({
//         required_error: "Option label is required",
//       })
//       .min(1, {
//         message: "Option label is required",
//       }),
//     isTrue: z.boolean().default(false),
//   }),
//   optionC: z.object({
//     label: z
//       .string({
//         required_error: "Option label is required",
//       })
//       .min(1, {
//         message: "Option label is required",
//       }),
//     isTrue: z.boolean().default(false),
//   }),
//   optionD: z.object({
//     label: z
//       .string({
//         required_error: "Option label is required",
//       })
//       .min(1, {
//         message: "Option label is required",
//       }),
//     isTrue: z.boolean().default(false),
//   }),
// });

// export const AddQuizForm = ({ quizSetId }) => {
//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     mode: "all",
//     defaultValues: {
//       question: "",
//       description: "",
//       optionA: {
//         label: "",
//         isTrue: false,
//       },
//       optionB: {
//         label: "",
//         isTrue: false,
//       },
//       optionC: {
//         label: "",
//         isTrue: false,
//       },
//       optionD: {
//         label: "",
//         isTrue: false,
//       },
//     },
//   });

//   const { isSubmitting, isValid, errors } = form.formState;
//   (errors);

//   const onSubmit = async (values) => {
//     try {
     

//       const correctness = [values.optionA.isTrue, values.optionB.isTrue, values.optionC.isTrue, values.optionD.isTrue];

//       const correctMarked = correctness.filter(c => c);

//       const isOneCorrecrMarked = (correctMarked.length === 1);

//       if (isOneCorrecrMarked) {
//         // Call server action
//         await addQuizToQuizSet(quizSetId, values);
//         // Reset the form
//         form.reset({
//           question: "",
//           description: "",
//           optionA: {
//             label: "",
//             isTrue: false,
//           },
//           optionB: {
//             label: "",
//             isTrue: false,
//           },
//           optionC: {
//             label: "",
//             isTrue: false,
//           },
//           optionD: {
//             label: "",
//             isTrue: false,
//           },
//         });

//         //toggleEdit();
//         router.refresh();

//       } else {
//         toast.error("You must mark only one correct answer.")
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="mt-6 border bg-gray-50 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Add New Quiz
//       </div>

//       {
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 mt-4"
//           >
//             {/* quiz title */}
//             <FormField
//               control={form.control}
//               name="question"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Quiz Question</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="Enter quiz question"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* quiz description */}
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Quiz Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       disabled={isSubmitting}
//                       placeholder="Enter quiz description"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* --------------- OPTION A -------- */}
//             <div className="space-y-3">
//                <Label>Option A</Label> 
//               <div className="flex items-start gap-3">
//                 <FormField
//                   control={form.control}
//                   name="optionA.isTrue"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <div className="flex-1">
//                   {/* option label  */}
//                   <FormField
//                     control={form.control}
//                     name="optionA.label"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             disabled={isSubmitting}
//                             placeholder="Enter quiz question"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* --------------- OPTION A ENDS -------- */}

//             {/* --------------- OPTION B -------- */}
//             <div className="space-y-3">
//               <label>Option B</label>
//               <div className="flex items-start gap-3">
//                 <FormField
//                   control={form.control}
//                   name="optionB.isTrue"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <div className="flex-1">
//                   {/* option label  */}
//                   <FormField
//                     control={form.control}
//                     name="optionB.label"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             disabled={isSubmitting}
//                             placeholder="Enter quiz question"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* --------------- OPTION B ENDS -------- */}

//             {/* --------------- OPTION C -------- */}
//             <div className="space-y-3">
//               <Label>Option C</Label>
//               <div className="flex items-start gap-3">
//                 <FormField
//                   control={form.control}
//                   name="optionC.isTrue"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <div className="flex-1">
//                   {/* option label  */}
//                   <FormField
//                     control={form.control}
//                     name="optionC.label"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             disabled={isSubmitting}
//                             placeholder="Enter quiz question"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* --------------- OPTION C ENDS -------- */}

//             {/* --------------- OPTION D -------- */}
//             <div className="space-y-3">
//               <Label>Option D</Label>
//               <div className="flex items-start gap-3">
//                 <FormField
//                   control={form.control}
//                   name="optionD.isTrue"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <div className="flex-1">
//                   {/* option label  */}
//                   <FormField
//                     control={form.control}
//                     name="optionD.label"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormControl>
//                           <Input
//                             disabled={isSubmitting}
//                             placeholder="Enter quiz question"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* --------------- OPTION D ENDS -------- */}
//             <div className="flex items-center justify-end gap-x-2">
//               <Button disabled={isSubmitting} type="submit">
//                 Save
//               </Button>
//             </div>
//           </form>
//         </Form>
//       }
//     </div>
//   );
// };

"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { addQuizToQuizSet, updateQuiz } from "@/app/actions/quiz";

const optionSchema = z.object({
  label: z.string().min(1, { message: "Option label is required" }),
  isTrue: z.boolean().default(false),
});

const formSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  optionA: optionSchema,
  optionB: optionSchema,
  optionC: optionSchema,
  optionD: optionSchema,
});

const emptyValues = {
  question: "",
  description: "",
  optionA: { label: "", isTrue: false },
  optionB: { label: "", isTrue: false },
  optionC: { label: "", isTrue: false },
  optionD: { label: "", isTrue: false },
};

// initialData shape expected: { id, question, description, options: [{label,isTrue} x4] }
function toFormValues(initialData) {
  if (!initialData) return emptyValues;
  const [optionA, optionB, optionC, optionD] = initialData.options;
  return {
    question: initialData.question ?? "",
    description: initialData.description ?? "",
    optionA,
    optionB,
    optionC,
    optionD,
  };
}

const OPTION_FIELDS = [
  { key: "optionA", label: "Option A" },
  { key: "optionB", label: "Option B" },
  { key: "optionC", label: "Option C" },
  { key: "optionD", label: "Option D" },
];

export const QuizForm = ({ quizSetId, initialData, onDone }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: toFormValues(initialData),
  });

  const { isSubmitting } = form.formState;

  // whenever a different quiz gets picked for editing (or edit is cancelled), refill the form
  useEffect(() => {
    form.reset(toFormValues(initialData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.id]);

  const onSubmit = async (values) => {
    try {
      const correctness = [
        values.optionA.isTrue,
        values.optionB.isTrue,
        values.optionC.isTrue,
        values.optionD.isTrue,
      ];
      const correctMarked = correctness.filter(Boolean);

      if (correctMarked.length !== 1) {
        toast.error("You must mark only one correct answer.");
        return;
      }

      if (isEditMode) {
        await updateQuiz(initialData.id, quizSetId, values);
        toast.success("Quiz updated successfully");
      } else {
        await addQuizToQuizSet(quizSetId, values);
        toast.success("Quiz added successfully");
      }

      form.reset(emptyValues);
      onDone?.();
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    form.reset(emptyValues);
    onDone?.();
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span>{isEditMode ? "Edit Quiz" : "Add New Quiz"}</span>
        {isEditMode && (
          <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <Label>Quiz Question</Label>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="Enter quiz question" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>Quiz Description</Label>
                <FormControl>
                  <Textarea disabled={isSubmitting} placeholder="Enter quiz description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {OPTION_FIELDS.map(({ key, label }) => (
            <div className="space-y-3" key={key}>
              <Label>{label}</Label>
              <div className="flex items-start gap-3">
                <FormField
                  control={form.control}
                  name={`${key}.isTrue`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`${key}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input disabled={isSubmitting} placeholder="Enter option text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end gap-x-2">
            <Button disabled={isSubmitting} type="submit">
              {isEditMode ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};