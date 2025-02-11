import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";
import styles from "./Key_Stats.module.css"; // Import CSS module

interface KS_Props {
  audio_link: string;
  duration_sec: number;
  tour_progress: number;
  total_tours: number;
}

const KeyStats: React.FC<KS_Props> = ({ audio_link, duration_sec, tour_progress, total_tours }) => {
  const minutes = Math.floor(duration_sec / 60);
  const seconds = duration_sec % 60;

  return (
    <div className={styles.container}>
      {/* Play Audio Section */}
      <div className={`${styles.section} ${styles.playSection}`}>
        <Link href={audio_link}>
          <FaPlay className={styles.audioIcon} />
          <span className={styles.text}>Play Audio</span>
        </Link>
      </div>

      {/* Audio Duration Section */}
      <div className={styles.section}>
        <span className={styles.audioDuration}>
          {minutes}:{seconds}
        </span>
        <span className={styles.text}>Audio Duration</span>
      </div>

      {/* Tour Progress Section */}
      <div className={`${styles.section} ${styles.progressSection}`}>
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
        <span className={styles.text}>Tour Progress</span>
      </div>
    </div>
  );
};

export default KeyStats;
