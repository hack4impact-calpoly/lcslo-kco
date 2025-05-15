import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/database/db";
import Audiofile from "@/database/models/audiofileSchema";

// Ensure database connection before handling requests
async function ensureDatabaseConnection() {
  await connectDB();
}

// Get specific audiofile by ID
export async function GET(request: NextRequest, context: any) {
  // now no more "implicit any" on `context`
  const { _id } = context.params as { _id: string };

  try {
    await ensureDatabaseConnection();
    const audiofile = await Audiofile.findById(_id).exec();
    if (!audiofile) {
      return NextResponse.json({ error: "Audiofile not found." }, { status: 404 });
    }
    return NextResponse.json(audiofile, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: "Invalid audiofile ID." }, { status: 400 });
    }
    console.error("Error fetching audiofile:", error);
    return NextResponse.json({ error: "Unable to fetch audiofile." }, { status: 500 });
  }
}

// Update specific audiofile by ID
export async function PUT(request: NextRequest, context: any) {
  const { _id } = context.params as { _id: string };

  try {
    await ensureDatabaseConnection();
    const { name, duration, description } = await request.json();

    const updatedAudiofile = await Audiofile.findByIdAndUpdate(
      _id,
      { $set: { name, duration, description } },
      { new: true, runValidators: true },
    ).exec();

    if (!updatedAudiofile) {
      return NextResponse.json({ error: "Audiofile not found." }, { status: 404 });
    }
    return NextResponse.json(updatedAudiofile, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: "Invalid audiofile ID." }, { status: 400 });
    }
    console.error("Error updating audiofile:", error);
    return NextResponse.json({ error: "Unable to update audiofile." }, { status: 500 });
  }
}
