import { Lesson } from "../model/lesson.model";
import { replaceMongoIdInObject } from "@/lib/convertdata";
export const getLesson = async (lessonId) => {
    const lesson = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInObject(lesson);
}