import { Button } from "@/components/ui/button";
import { CircleCheck , CircleX } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";


import { sendEmails } from "@/lib/emails";

import { enrollForCourse } from "@/queries/enrollments";

const Success = async ({ searchParams }) => {
    const {session_id , courseId}= await searchParams


    if (!session_id)
        throw new Error(
            "Please provide a valid session id that starts with cs_"
        );

    const userSession = await auth();

    if (!userSession?.user?.email) {
        redirect("/login");
    }

    const course = await getCourseDetails(courseId);
    const loggedInUser = await getUserByEmail(userSession?.user?.email);

    const checkoutSession = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["line_items", "payment_intent"],
        }
    );

    //(checkoutSession);

    const paymentIntent = checkoutSession?.payment_intent;
    const paymentStatus = paymentIntent?.status;

  

    // Cutomer info
    const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
    const customerEmail = loggedInUser?.email;
    const productName = course?.title;
   

    if (paymentStatus === "succeeded") {
        // Update DB(Enrollment collection)
      
        const enrolled = await enrollForCourse(
          course?.id,
          loggedInUser?.id,
          "stripe"
        );
        

        // Send Emails to the instructor, student,and the person
        // who paid

        const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
        const instructorEmail = course?.instructor?.email;
     


        const emailsToSend = [
          {
            to: instructorEmail,
            subject: `New Enrollment for ${productName}.`,
            message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
          },
          {
            to: customerEmail,
            subject: `Enrollment Success for ${productName}`,
            message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
          }
        ];

        const emailSentResponse = await sendEmails(emailsToSend);
        (emailSentResponse);
    }

    return (
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
                {paymentStatus === "succeeded" ? (
                    <>
                        <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl">
                            Congratulations, <strong>{customerName}</strong>! Your Enrollment was Successful for <strong>{productName}</strong>
                        </h1>
                    </>
                ) : (
                    <>
                       <CircleX className="w-32 h-32 bg-destructive rounded-full p-0 text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl">
                            Sorry, <strong>{customerName}</strong>! Your payment for <strong>{productName}</strong> could not be completed.
                        </h1>
                        <p className="text-muted-foreground">
                            Please try again, or contact support if the amount was deducted from your account.
                        </p>
                    </>
                )}
              
            </div>
        </div>
    );
};
export default Success;