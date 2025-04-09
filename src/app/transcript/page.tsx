"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import { FullTranscriptView } from "@/components/transcript";
import AudioControls from "@/components/AudioControls";
import AudioPlayer from "@/components/AudioPlayer";

function TranscriptFullViewDetails() {
  const searchParams = useSearchParams();

  const transcript = searchParams.get("transcript");
  const imageUrl = searchParams.get("imageUrl");

  return <FullTranscriptView transcript={transcript || ""} imageUrl={imageUrl || ""} />;
}

function TranscriptFullViewPageContent() {
  const searchParams = useSearchParams();
  const audioUri = searchParams.get("audioUri");
  const imageUrl = searchParams.get("imageUrl");

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-end"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <TranscriptFullViewDetails />
      <AudioPlayer audioURL={audioUri || ""} name={""} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading transcript...</div>}>
      <TranscriptFullViewPageContent />
    </Suspense>
  );
}
