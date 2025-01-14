import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";
import { stripe } from "@/lib/stripe";
import { sendEmails } from "@/lib/emails";
import { enrollForCourse } from "@/queries/enrollments";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) throw new Error("No session id found");

  const userSession = await auth();
  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  if (paymentStatus === "succeeded") {
    //update in database
    const enrolled = await enrollForCourse( course?.id, loggedInUser?.id, "stripe");


   //send email
   const instructorName= `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
   const instructorEmail = course?.instructor?.email;
   const emailToSend = [
    {
      to: instructorEmail,
      subject:  `You have a new student enrolled in your course ${productName}`,
      message: `congratulations  ${instructorName}, You have a new student enrolled in your course ${productName}.`
    
    },{
      to: customerEmail,
      subject:  `You have enrolled in ${productName}`,
      message: `congratulations  ${customerName}, You have enrolled in ${productName}.`
    }
   ]

   const emailSentResponse = await sendEmails(emailToSend);
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
      {paymentStatus === "succeeded" && ( <>
        <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
        Congratulations, <strong>{customerName}</strong>! Your Enrollment was Successful for <strong>{productName}</strong>
        </h1>
        </>)}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
