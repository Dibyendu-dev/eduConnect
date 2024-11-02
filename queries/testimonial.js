import { replaceMongoIdInArray } from "@/lib/convertdata";
import { Testimonial } from "../model/testimonial.model";

export async function getTestimonialsForCourse(courseId) {
    const testimonials = await Testimonial.find({course: courseId}).lean();
    return replaceMongoIdInArray(testimonials);
}