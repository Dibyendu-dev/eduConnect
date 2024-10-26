import { Category } from "../model/category.model";
import { replaceMongoIdInArray } from "@/lib/convertdata";

export async function getCategories(){
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}