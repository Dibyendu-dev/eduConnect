import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: {
        required: true,
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    courseId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    rating: {
        required: true,
        type: Number,
    },
}, {timestamps: true});

export const Testimonial =
    mongoose.models.Testimonial ??
    mongoose.model("Testimonial", testimonialSchema);