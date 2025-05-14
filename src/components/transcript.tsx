/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/transcript.module.css";
import { IconButton } from "@chakra-ui/react";
import { FiMaximize } from "react-icons/fi";

interface TranscriptViewProps {
  transcript: string;
  imageUrl: string;
}

interface TranscriptProps {
  audioUri: string;
  imageUrl: string;
}

const ExpandButton: React.FC = () => {
  return (
    <IconButton aria-label="Expand" size="md" rounded="full" bg="gray.300" _hover={{ bg: "gray.200" }}>
      <FiMaximize />
    </IconButton>
  );
};

export function TranscriptView({ audioUri, imageUrl }: TranscriptProps) {
  const [transcript, setTranscript] = useState("Loading transcript...");

  useEffect(() => {
    const fetchTranscript = async (audioUrl: string) => {
      try {
        console.log("audioUrl: " + audioUrl);
        const fixedUrl = audioUrl.startsWith("https://d1omyfn3jea7ni.cloudfront.net/")
          ? audioUrl.replace("https://d1omyfn3jea7ni.cloudfront.net/", "https://s3.amazonaws.com/lcslo-images/")
          : audioUrl;

        const response = await fetch(`/api/Transcript?url=${encodeURIComponent(fixedUrl)}`, {
          method: "GET",
        });
        const data = await response.json();
        setTranscript(data.transcript);
      } catch (error) {
        console.error("Failed to fetch transcript:", error);
        setTranscript("Error fetching transcript.");
      }
    };

    fetchTranscript(audioUri);
  }, []);
  return (
    <div className={styles.base}>
      <div className={styles.transcriptHeader}>
        <span className={styles.transcriptHeaderLabel}>Transcript</span>
        <Link
          href={{ pathname: `/transcript`, query: { transcript: transcript, imageUrl: imageUrl, audioUri: audioUri } }}
        >
          <ExpandButton />
        </Link>
      </div>
      <div className={styles.transcriptContent}>
        <span className={styles.transcriptText}>{transcript}</span>
      </div>
    </div>
  );
}

export function FullTranscriptView({ transcript }: TranscriptViewProps) {
  return (
    <div className={styles.baseFull}>
      <div className={styles.transcriptHeaderFull}>
        <span className={styles.transcriptHeaderLabelFull}>Transcript</span>
        <ExpandButton />
      </div>

      <div className={styles.transcriptContentFull}>
        <div className={styles.transcriptTextFull}>{transcript}</div>
      </div>
    </div>
  );
}
