"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import AudioControls from "@/components/AudioControls";

export default function Page() {
  return (
    <main>
      <Navbar />
      {/* sample audio formatting */}
      <AudioPlayer audioURL="https://d1omyfn3jea7ni.cloudfront.net/Daniel_Spanish_Final.wav" name="Test Audio" />
    </main>
  );
}
