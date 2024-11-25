import { Resend } from "resend";
import { EmailTemplete } from "@/components/email-templete";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.message && data.subject) {
        const { to, message, subject } = data;
        const sentInfo = await resend.emails.send({
          from: "ddas4548@gmail.com",
          to: to,
          subject: subject,
          react: EmailTemplete({ message }),
        });
        return sentInfo;
      } else {
        const rejectedPromise = new Promise((reject) => {
          return reject(
            new Error(
              `Email info is not valid,please check the ${JSON.stringify(data)}`
            )
          );
        });
      }
      return rejectedPromise;
    })
  );
  return response;
};
