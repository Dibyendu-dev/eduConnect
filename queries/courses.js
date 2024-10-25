import { Course } from "../model/course.model";
import { Category } from "../model/category.model";
import { User } from "../model/user.model";
import { Testimonial } from "../model/testimonial.model";
import { Module } from "../model/module.model";

import { replaceMongoIdInArray } from "@/lib/convertdata";
 
export async function getCourseList() {
    const courses = await Course.find({})
    .select(["title","subtitle", "thumbnail", "price",  "category", "instructor",  "modules"])
    .populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean();

    return replaceMongoIdInArray(courses)
}