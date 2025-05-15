import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/database/db";
import Audiofile from "@/database/models/audiofileSchema";

// Ensure database connection before handling requests
async function ensureDatabaseConnection() {
  try {
    await connectDB();
  } catch (connectError) {
    console.error("Error connecting to database:", connectError);
    throw new Error("Database connection error.");
  }
}

// Get specific audiofile by ID
export async function GET(request: NextRequest, { params }) {
  const _id = params._id as string; // TS will infer params is Record<string,string|string[]>

  try {
    await ensureDatabaseConnection();
    const audiofile = await Audiofile.findById(_id).exec();
    if (!audiofile) {
      return NextResponse.json({ error: "Audiofile not found." }, { status: 404 });
    }
    return NextResponse.json(audiofile, { status: 200 });
  } catch (error) {
    console.error("Error fetching audiofile:", error);
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: "Invalid audiofile ID." }, { status: 400 });
    }
    return NextResponse.json({ error: "Error: Unable to fetch the audiofile." }, { status: 500 });
  }
}

// Update specific audiofile by ID
export async function PUT(request: NextRequest, { params }) {
  const _id = params._id as string;

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
    console.error("Error updating audiofile:", error);
    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ error: "Invalid audiofile ID." }, { status: 400 });
    }
    return NextResponse.json({ error: "Error: Unable to update the audiofile." }, { status: 500 });
  }
}
