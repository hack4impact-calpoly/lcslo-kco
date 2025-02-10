import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Audiofile from "@/database/models/audiofileSchema";

export async function GET() {
  try {
    await connectDB();
    const audiofiles = await Audiofile.find().exec();
    if (!audiofiles.length) {
      return NextResponse.json({ error: "No audio files found." }, { status: 404 });
    }
    return NextResponse.json(audiofiles, { status: 200 });
  } catch (error) {
    console.error("Error fetching audio files:", error);
    return NextResponse.json({ error: "Error: Unable to fetch audio files." }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    await connectDB();

    // Parse the request body
    const body = await request.json();
    const { name, url, duration, description } = body;

    // Validate required fields
    if (!name || !url) {
      return NextResponse.json({ error: "Name and URL are required fields." }, { status: 400 });
    }

    // Create and save the new audiofile
    const newAudiofile = new Audiofile({ name, url, duration, description });
    await newAudiofile.save();

    return NextResponse.json(newAudiofile, { status: 201 });
  } catch (error) {
    console.error("Error creating audio file:", error);
    return NextResponse.json({ error: "Error: Unable to create audio file." }, { status: 500 });
  }
}
