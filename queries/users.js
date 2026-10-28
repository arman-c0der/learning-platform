import { User } from "@/model/user-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/service/mongo";

export async function getUserByEmail(email) {
    await dbConnect();
    const user = await User.findOne({ email: email }).select("-password").lean();
    return replaceMongoIdInObject(user);
}

export async function getUserDetails(userId) {
    await dbConnect();
    const user = await User.findById(userId).select("-password").lean();
    return replaceMongoIdInObject(user);
}

export async function validatePassword(email, password) {
    await dbConnect();
    // password সহ ইউজার আনতে হবে, তাই getUserByEmail ব্যবহার করা যাবে না
    const user = await User.findOne({ email }).lean();
    if (!user) return false;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

export async function updateUserProfilePicture(email, imagePath) {
    await dbConnect();
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { profilePicture: imagePath },
        { new: true }
    )
        .select("-password")
        .lean();

    return replaceMongoIdInObject(updatedUser);
}