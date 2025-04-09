export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    console.log("HELLO: " + url);
    if (!url) {
      return NextResponse.json({ error: "Missing audio URL" }, { status: 400 });
    }
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY); // Use env variable

    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: url,
      },
      {
        model: "nova-3",
        smart_format: true,
      },
    );

    if (error) {
      console.error("Deepgram error details:", error);
      return NextResponse.json({ error: "Deepgram API Error", details: error }, { status: 500 });
    }

    const transcript = result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "No transcript found";

    return NextResponse.json({ transcript });
  } catch (err) {
    console.error("Error transcribing URL:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
