import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    phone: {
        required: false,
        type: String,
    },
    role: {
        required: true,
        type: String,
    },
    bio: {
        required: false,
        type: String,
    },
    socialMedia: {
        required: false,
        type: Object,
    },
    password: {
    required: false,   // Google ইউজারের পাসওয়ার্ড নেই
    type: String,
},
    profilePicture: {
        required: true,
        type: String,
    },
    designation: {
        required: false,
        type: String,
    }
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);