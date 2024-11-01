import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourse from "./_components/RelatedCourse";
import { getCourseDetails } from "../../../../../queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertdata";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);
  // console.log(course.testimonials);
  return (
    <>
      <CourseDetailsIntro 
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
        
      />

      <CourseDetails course={course} />

      {course?.testimonials && <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />}

      <RelatedCourse  />

      {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
      {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
    </>
  );
};
export default SingleCoursePage;
