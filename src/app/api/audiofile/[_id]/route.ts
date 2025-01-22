import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/database/db";
import Audiofile from "@/database/models/audiofileSchema";

// Get specific audiofile by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid audiofile ID" }, { status: 400 });
  }

  // Connect to database
  try {
    await connectDB();
    const audiofile = await Audiofile.findById(id).exec();
    if (!audiofile) {
      return NextResponse.json({ error: "Audiofile not found." }, { status: 404 });
    }
    return NextResponse.json(audiofile, { status: 200 });
  } catch (error) {
    console.error("Error fetching audiofile:", error);
    return NextResponse.json({ error: "Error: Unable to fetch the audiofile." }, { status: 500 });
  }
}
