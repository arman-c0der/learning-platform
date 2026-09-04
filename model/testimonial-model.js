import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

export const Testimonial =
    mongoose.models.Testimonial ??
    mongoose.model("Testimonial", testimonialSchema);