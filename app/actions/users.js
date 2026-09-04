"use server";

import { auth } from "@/auth";
import { updateUserProfilePicture } from "@/queries/users";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function uploadProfilePicture(formData) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const file = formData.get("file");
    if (!file || file.size === 0) {
        throw new Error("No file provided");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const fileName = `${session.user.email.split("@")[0]}-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // ফোল্ডার না থাকলে বানিয়ে নিন
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${fileName}`;

    const updatedUser = await updateUserProfilePicture(session.user.email, publicPath);

    revalidatePath("/account");

    return updatedUser;
}