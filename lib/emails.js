import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo || emailInfo.length === 0) {
    return [];
  }

  const response = await Promise.allSettled(
    emailInfo.map(async ({ to, subject, message }) => {
      if (!to || !subject || !message) {
        throw new Error("Missing email information.");
      }

      const result = await resend.emails.send({
        // Development এর জন্য
        from: "onboarding@resend.dev",

        // Production এ domain verify করার পর এটা ব্যবহার করবে
        // from: "noreply@yourdomain.com",

        to,
        subject,
        react: EmailTemplate({ message }),
      });

     

      return result;
    })
  );

 console.dir(response, { depth: null });



  return response;
};