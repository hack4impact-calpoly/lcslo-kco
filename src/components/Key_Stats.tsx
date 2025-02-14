import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "./Key_Stats.module.css";

/*
PlayAudio Component (1 of 3)
  - contains a play audio icon to play POI audio (to be implemented in a later issue)
*/
interface PA_Props {
  audio_link: string;
}
const PlayAudio: React.FC<PA_Props> = ({ audio_link }) => {
  return (
    <div className={styles.playSection}>
      <Link href={audio_link}>
        <FaPlay className={styles.audioIcon} />
        <span className={styles.playText}>Play Audio</span>
      </Link>
    </div>
  );
};

/*
AudioDuration Component (2 of 3)
  - contains the duration of the audio segment for this POI
  - passed in as seconds, converted into a minute:second format
*/
interface AD_Props {
  duration_sec: number;
}
const AudioDuration: React.FC<AD_Props> = ({ duration_sec }) => {
  //convert total seconds into minutes and seconds
  const minutes = Math.floor(duration_sec / 60);
  const seconds = duration_sec % 60;

  return (
    <div className={styles.section}>
      <span className={styles.audioDuration}>
        {minutes}:{seconds}
      </span>
      <span className={styles.audioText}>Audio Duration</span>
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
    <div className={styles.progressSection}>
      <div className={styles.progressContainer}>
        <svg className="absolute transform rotate-90" width="75" height="75" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#D29561" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#F7CBA6"
            strokeWidth="10"
            fill="none"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(tour_progress / total_tours) * 2 * Math.PI * 45}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className={styles.progressText}>
          {tour_progress}/{total_tours}
        </div>
      </div>
      <span className={styles.tourText}>Tour Progress</span>
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
  duration_sec: number;
  tour_progress: number;
  total_tours: number;
}

const KeyStats: React.FC<KS_Props> = ({ audio_link, duration_sec, tour_progress, total_tours }) => {
  return (
    <div className={styles.container}>
      {/* Play Audio Section */}
      <PlayAudio audio_link={audio_link}></PlayAudio>

      {/* Audio Duration Section */}
      <AudioDuration duration_sec={duration_sec}></AudioDuration>

      {/* Tour Progress Section */}
      <TourProgress total_tours={total_tours} tour_progress={tour_progress}></TourProgress>
    </div>
  );
};

export default KeyStats;
