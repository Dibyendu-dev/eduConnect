import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema({
    assessment: {
        required: true,
        type: ArrayBuffer,
    },
    otherMarks: {
        required: true,
        type: Number,    
    },    
    
    });

export const Assessment = mongoose.models.Assessment ?? mongoose.model("Assessment", assessmentSchema);