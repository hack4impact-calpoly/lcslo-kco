import connectDB from "@/database/db";
import { NextResponse } from "next/server";
import POIModel, { Poi } from "@/database/models/POISchema";

/**
 * Example GET API route
 * @returns {message: string}
 */
export async function GET() {
  try {
    await connectDB();
    const POIs = await POIModel.find({});
    return NextResponse.json({ POIs });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
