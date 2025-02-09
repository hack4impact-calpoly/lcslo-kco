import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "@/styles/keyStats.module.css";
import { Button } from "@chakra-ui/react/button";

/*
PlayAudio Component (1 of 3)
  - contains a play audio icon to play POI audio (to be implemented in a later issue)
*/
interface PA_Props {
  toggleAudioPlayer: () => void;
}

const PlayAudio: React.FC<PA_Props> = ({ toggleAudioPlayer }) => {
  return (
    <div className={styles.section}>
      <Button onClick={toggleAudioPlayer}>
        <FaPlay className={styles.audioIcon} />
      </Button>
      <span className={styles.paText}>Play Audio</span>
    </div>
  );
};

/*
AudioDuration Component (2 of 3)
  - contains the duration of the audio segment for this POI
  - passed in as seconds, converted into a minute:second format
*/
interface AD_Props {
  duration: string;
}
const AudioDuration: React.FC<AD_Props> = ({ duration }) => {
  //convert total seconds into minutes and seconds

  return (
    <div className={styles.section}>
      <span className={styles.audioDuration}>{duration}</span>
      <span className={styles.adText}>Audio Duration</span>
    </div>
  );
};

/*
TourProgress Component (3 of 3)
  - contains circular progress bar to indicate overall progress
  - takes in current progress, and total number of tours
*/
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
      <span className={styles.tpText}>Tour Progress</span>
    </div>
  );
};

/*
Main KeyStats Component (contains the previous three and is exported)
  - contains the three above components side by side
  - used within the larger Selected_POI_Page component that additionally displays images and 
    POI description/content
*/
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
