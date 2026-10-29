import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    try {
        const { firstName, lastName, email, password, userRole } =
            await request.json();

        if (!firstName || !email || !password || !userRole) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        await dbConnect();

        const normalizedEmail = email.toLowerCase();

        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return new NextResponse("Email already registered", { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName: lastName || "",
            email: normalizedEmail,
            password: hashedPassword,
            role: userRole,
            profilePicture: "",
        });

        return new NextResponse("User has been created", { status: 201 });
    } catch (error) {
      
        return new NextResponse(error.message, { status: 500 });
    }
};