import React, { useState } from "react";
import KeyStats from "./keyStats";
import styles from "@/styles/selectedPoi.module.css";
import { Button } from "@chakra-ui/react";
import AudioPlayer from "./AudioPlayer";
import { TranscriptView } from "./transcript";

//Subcomponent to display image (unblurred) and header of the POI name
interface OverlayImageProps {
  src: string;
  header: string;
}
const OverlayImage: React.FC<OverlayImageProps> = ({ src, header }) => {
  return (
    <div className={styles.overlayContainer}>
      <h1 className={styles.overlayHeader}>{header}</h1>
      <img src={src} alt="Overlay" className={styles.overlayImage} />
    </div>
  );
};

//Main component containing Key_Stats subcomponent, and content
interface POIProps {
  mainImage: string;
  name: string;
  content: string;
  audio_link: string;
  duration: string;
  tour_progress: number;
  total_tours: number;
}

const Selected_POI_Page: React.FC<POIProps> = ({
  mainImage,
  name,
  content,
  audio_link,
  duration,
  tour_progress,
  total_tours,
}) => {
  const [isAudioVisible, setIsAudioVisible] = useState(false);

  const toggleAudioPlayer = () => {
    setIsAudioVisible((prev) => !prev);
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainImageContainer}>
        <img src={mainImage} alt="Main" className={styles.mainImage} />
      </div>

      <div className={styles.contentContainer}>
        <OverlayImage src={mainImage} header={name} />
        <div className={styles.statsWrapper}>
          <KeyStats
            audio_link={audio_link}
            duration={duration}
            tour_progress={tour_progress}
            total_tours={total_tours}
            toggleAudioPlayer={toggleAudioPlayer}
          />
        </div>
        <div>
          <p className={styles.textContent}>
            <span className={styles.description}>Description: </span> {content}
          </p>
        </div>
      </div>

      {isAudioVisible && <TranscriptView audioUri={audio_link} imageUrl={mainImage}></TranscriptView>}

      {isAudioVisible && <AudioPlayer audioURL={audio_link} name="POI Audio" />}
    </div>
  );
};

export default Selected_POI_Page;
