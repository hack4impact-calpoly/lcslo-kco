import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "@/styles/keyStats.module.css";
import { Button } from "@chakra-ui/react/button";

interface PA_Props {
  toggleAudioPlayer: () => void;
}

const PlayAudio: React.FC<PA_Props> = ({ toggleAudioPlayer }) => {
  return (
    <div className={styles.section}>
      <Button onClick={toggleAudioPlayer} className={styles.audioButton}>
        <FaPlay className={styles.audioIcon} />
      </Button>
      <div className={styles.vertCenter}>
        <span className={styles.paText}>Play Audio</span>
      </div>
    </div>
  );
};

interface AD_Props {
  duration: string;
}
const AudioDuration: React.FC<AD_Props> = ({ duration }) => {
  return (
    <div className={styles.section}>
      <span className={styles.audioDuration}>{duration}</span>
      <div className={styles.vertCenter}>
        <span className={styles.adText}>Audio Duration</span>
      </div>
    </div>
  );
};

interface TP_Props {
  tour_progress: number;
  total_tours: number;
}
const TourProgress: React.FC<TP_Props> = ({ tour_progress, total_tours }) => {
  return (
    <div className={styles.section}>
      <div className={styles.progressContainer}>
        <svg className={styles.progressSvg} width="75" height="75" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className={styles.progressBgCircle} />
          <circle
            cx="50"
            cy="50"
            r="45"
            className={styles.progressFillCircle}
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(tour_progress / total_tours) * 2 * Math.PI * 45}
          />
        </svg>
        <div className={styles.progressText}>
          {tour_progress}/{total_tours}
        </div>
      </div>
      <div className={styles.vertCenter}>
        <span className={styles.tpText}>Tour Progress</span>
      </div>
    </div>
  );
};

interface KS_Props {
  audio_link: string;
  duration: string;
  tour_progress: number;
  total_tours: number;
  toggleAudioPlayer: () => void; // New prop
}

const KeyStats: React.FC<KS_Props> = ({ audio_link, duration, tour_progress, total_tours, toggleAudioPlayer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sideContainer}>
        <PlayAudio toggleAudioPlayer={toggleAudioPlayer} />
      </div>
      <div className={styles.centerContainer}>
        <AudioDuration duration={duration} />
      </div>
      <div className={styles.sideContainer}>
        <TourProgress total_tours={total_tours} tour_progress={tour_progress} />
      </div>
    </div>
  );
};

export default KeyStats;
