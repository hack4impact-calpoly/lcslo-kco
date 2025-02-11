"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1> {/* sample audio formatting */}
      <AudioPlayer
        audioURL="https://og83eubqb6o3yptf.public.blob.vercel-storage.com/Bill_Deneen_Kathleen_Final-KDIk27mD6mgRGoXc2MyH7NLrmvXFAR.wav"
        name="Test Audio"
      />
    </main>
  );
}
