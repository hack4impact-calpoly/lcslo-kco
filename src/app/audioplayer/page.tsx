"use client";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import AudioControls from "@/components/AudioControls";

export default function Page() {
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1> {/* sample audio formatting */}
      <AudioPlayer audioURL="https://d1omyfn3jea7ni.cloudfront.net/Daniel_Spanish_Final.wav" name="Test Audio" />
    </main>
  );
}
