import { Enrollment } from "../model/enrollment.model";
import { replaceMongoIdInArray } from "@/lib/convertdata";

export async function getEnrollmentsForCourse(courseId) {
    const enrollments = await Enrollment.find({course: courseId}).lean();
    return replaceMongoIdInArray(enrollments);
    
}