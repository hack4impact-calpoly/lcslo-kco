import React, { useState, useEffect } from "react";
import styles from "@/styles/transcript.module.css";
import { IconButton } from "@chakra-ui/react";
import { FiMaximize, FiMinimize } from "react-icons/fi";

interface TranscriptProps {
  audioUri: string;
  imageUrl: string;
}

export function TranscriptView({ audioUri, imageUrl }: TranscriptProps) {
  const [transcript, setTranscript] = useState("Loading transcript...");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchTranscript = async (audioUrl: string) => {
      try {
        const fixedUrl = audioUrl.startsWith("https://d1omyfn3jea7ni.cloudfront.net/")
          ? audioUrl.replace("https://d1omyfn3jea7ni.cloudfront.net/", "https://s3.amazonaws.com/lcslo-images/")
          : audioUrl;

        const response = await fetch(`/api/Transcript?url=${encodeURIComponent(fixedUrl)}`);
        const data = await response.json();
        setTranscript(data.transcript);
      } catch (error) {
        console.error("Failed to fetch transcript:", error);
        setTranscript("Error fetching transcript.");
      }
    };

    fetchTranscript(audioUri);
  }, [audioUri]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={isExpanded ? styles.baseFull : styles.base}>
      <div className={isExpanded ? styles.transcriptHeaderFull : styles.transcriptHeader}>
        <span className={isExpanded ? styles.transcriptHeaderLabelFull : styles.transcriptHeaderLabel}>Transcript</span>
        <IconButton
          aria-label={isExpanded ? "Collapse" : "Expand"}
          size="md"
          rounded="full"
          bg="gray.300"
          _hover={{ bg: "gray.200" }}
          onClick={toggleExpand}
        >
          {isExpanded ? <FiMinimize /> : <FiMaximize />}
        </IconButton>
      </div>

      <div className={isExpanded ? styles.transcriptContentFull : styles.transcriptContent}>
        <div className={isExpanded ? styles.transcriptTextFull : styles.transcriptText}>
          <div style={{ width: "100%" }}>{transcript}</div>
        </div>
      </div>
    </div>
  );
}
