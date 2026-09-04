import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function GET() {
  ("GET HIT");
  return Response.json({ ok: true });
}
export const POST = async (request) => {
    ("REGISTER API HIT");
    const { firstName, lastName, email, password, userRole } = await request.json();



    await dbConnect();

      ("Connected DB:", mongoose.connection.name);

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: userRole
    }

    

    try {
    ("Before create");

    const user = await User.create(newUser);

    ("After create");
    (user);

    return new NextResponse("User has been created", {
        status: 201,
    });
} catch (error) {
    ("Catch block");
    (error);

    return new NextResponse(error.message, {
        status: 500,
    });
}
}