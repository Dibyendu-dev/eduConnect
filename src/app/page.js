import Test from "@/components/test";
import { getCourses } from "../../queries/courses";

export default async function Home() {
  const courses = await getCourses();
  console.log(courses);
  console.log(courses[0]?.instructor?.socialMedia);
  console.log(courses[0]?.testimonials);
  console.log(courses[0]?.modules);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <Test/>

    </div>
  );
}
