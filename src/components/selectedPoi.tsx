/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import KeyStats from "./keyStats";
import AudioControls from "./AudioControls";
import { Howl } from "howler";
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
  id: string;
}

//For sessionStorage; to update isComplete
interface POI {
  _id: string;
  name: string;
  description: string;
  audioField: string;
  duration: string;
  image: string;
  isComplete: boolean;
}

const Selected_POI_Page: React.FC<POIProps> = ({
  mainImage,
  name,
  content,
  audio_link,
  duration,
  tour_progress,
  total_tours,
  id,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [audio_link],
      html5: true,
      onend: () => setIsPlaying(false),
    });
    return () => {
      soundRef.current?.unload();
    };
  }, [audio_link]);

  const togglePlayPause = () => {
    if (!visible) setVisible(true);
    const sound = soundRef.current;
    if (!sound) return;
    if (isPlaying) sound.pause();
    else sound.play();
    setIsPlaying(!isPlaying);
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
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            duration={duration}
            tour_progress={newTourProgress}
            total_tours={total_tours}
            toggleAudioPlayer={toggleAudioPlayer}
          />
        </div>
        <div className={styles.audioButtonWrapper}>
          <button onClick={togglePlayPause} className={styles.audioButton}>
            {isPlaying ? "Pause Audio" : "Play Audio"}
          </button>
        </div>
        {visible && <AudioControls isPlaying={isPlaying} togglePlayPause={togglePlayPause} soundRef={soundRef} />}
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
