import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import { connectDB } from "@/utils/connect";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        {
          message: "User with this email already exists.",
        },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error occured while registering the user",
      },
      { status: 500 }
    );
  }
}
