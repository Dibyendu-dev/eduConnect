import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import {getCategoryDetails} from "@/queries/category";

const EnrolledCourseCard = async ({enrollment}) => {
    const courseCategory = await getCategoryDetails(enrollment?.courses?.category?._id);

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
    <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
            src={enrollment?.courses?.title}
            alt={"course"}
            className="object-cover"
            fill
        />
    </div>
    <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
        {enrollment?.courses?.title}
        </div>
        <p className="text-xs text-muted-foreground">{courseCategory?.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                    <BookOpen className="w-4" />
                </div>
                <span>{enrollment?.courses?.modules?.length} Chapters</span>
            </div>
        </div>
        <div className=" border-b pb-2 mb-2">
            <div className="flex items-center justify-between">
                <p className="text-md md:text-sm font-medium text-slate-700">
                    Total Modules: {enrollment?.courses?.modules?.length}
                </p>
                <p className="text-md md:text-sm font-medium text-slate-700">
                    Completed Modules <Badge variant="success">05</Badge>
                </p>
            </div>
            <div className="flex items-center justify-between mt-2">
                <p className="text-md md:text-sm font-medium text-slate-700">
                    Total Quizzes: 10
                </p>

                <p className="text-md md:text-sm font-medium text-slate-700">
                    Quiz taken <Badge variant="success">10</Badge>
                </p>
            </div>
            <div className="flex items-center justify-between mt-2">
                <p className="text-md md:text-sm font-medium text-slate-700">
                    Mark from Quizzes
                </p>

                <p className="text-md md:text-sm font-medium text-slate-700">
                    50
                </p>
            </div>
            <div className="flex items-center justify-between mt-2">
                <p className="text-md md:text-sm font-medium text-slate-700">
                    Others
                </p>

                <p className="text-md md:text-sm font-medium text-slate-700">
                    50
                </p>
            </div>
        </div>
        <div className="flex items-center justify-between mb-4">
            <p className="text-md md:text-sm font-medium text-slate-700">
                Total Marks
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
                100
            </p>
        </div>

        {/*<CourseProgress
            size="sm"
            value={80}
            variant={110 === 100 ? "success" : ""}
/>*/}
    </div>
</div>
  )
}

export default EnrolledCourseCard