import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/database/db";
import Audiofile from "@/database/models/audiofileSchema";

// Utility function to validate ObjectId
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get specific audiofile by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
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

// Update specific audiofile by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid audiofile ID" }, { status: 400 });
  }

  try {
    // Connect to the database
    try {
      await connectDB();
    } catch (connectError) {
      console.error("Error connecting to database:", connectError);
      return NextResponse.json({ error: "Database connection error." }, { status: 500 });
    }

    // Parse the request body
    const body = await request.json();
    const { name, duration, description } = body;

    // Validate input fields
    if (!name && !duration && !description) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    // Find the audiofile by ID and update it
    const updatedAudiofile = await Audiofile.findByIdAndUpdate(
      id,
      { $set: { name, duration, description } },
      { new: true, runValidators: true } // Return the updated document and run validators
    ).exec();

    if (!updatedAudiofile) {
      return NextResponse.json({ error: "Audiofile not found." }, { status: 404 });
    }

    return NextResponse.json(updatedAudiofile, { status: 200 });
  } catch (error) {
    console.error("Error updating audiofile:", error);
    return NextResponse.json({ error: "Error: Unable to update the audiofile." }, { status: 500 });
  }
}