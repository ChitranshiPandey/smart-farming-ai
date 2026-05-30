import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const client = await clientPromise;

    // const db = client.db("agrismart");
    const db = client.db("agri-smart");

    const user = await db
      .collection("users")
      .findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }

    // return NextResponse.json({
    //   success: true,
    //   message: "Login successful",
    // });


    return NextResponse.json({
  success: true,
  message: "Login successful",
  user: {
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}