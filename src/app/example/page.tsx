"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

import { TranscriptView } from "@/components/transcript";

export default function Page() {
  const [transcript, setTranscript] = useState("Loading transcript...");

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await fetch("/api/Transcript", {
          method: "GET", // Ensure GET method is used
        });
        const data = await response.json();
        setTranscript(data.transcript); // Update state with transcript
      } catch (error) {
        console.error("Failed to fetch transcript:", error);
        setTranscript("Error fetching transcript.");
      }
    };

    fetchTranscript();
  }, []);

  return (
    <div>
      <Navbar />

      <TranscriptView audioUri={""} />
    </div>
  );
}
