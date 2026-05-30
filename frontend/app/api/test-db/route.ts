import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("agri-smart");

    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      success: true,
      collections,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}