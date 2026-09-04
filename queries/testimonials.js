import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getTestimonialsForCourse(courseId) {
    const testimonials = await Testimonial.find({ courseId })
        .populate({
            path: "user",
            model: User,
        })
        .lean();

    return replaceMongoIdInArray(testimonials);
}