import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/database/db";
import Audiofile from "@/database/models/audiofileSchema";

async function ensureDatabaseConnection() {
  await connectDB();
}

type Params = {
  params: {
    _id: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  const { _id } = params;

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

export async function PUT(request: NextRequest, { params }: Params) {
  const { _id } = params;

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
