import connectDB from "@/database/db";
import { NextResponse } from "next/server";
import POIModel from "@/database/models/POISchema";

export async function GET() {
  try {
    await connectDB();
    const POIs = await POIModel.find({}).populate("audioFile", "url duration").exec();
    return NextResponse.json({ POIs });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
