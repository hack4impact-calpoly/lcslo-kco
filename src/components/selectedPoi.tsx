/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import KeyStats from "./keyStats";
import AudioControls from "./AudioControls";
import { Howl } from "howler";
import styles from "@/styles/selectedPoi.module.css";

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
    //overall container
    <div className={styles.pageContainer}>
      {/* first div with blurred image*/}
      <div className={styles.mainImageContainer}>
        <img src={mainImage} alt="Main" className={styles.mainImage} />
      </div>

      {/* second div with overlage and key stats sub components*/}
      <div className={styles.contentContainer}>
        <OverlayImage src={mainImage} header={name} />
        <div className={styles.statsWrapper}>
          <KeyStats
            audio_link={audio_link}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            duration={duration}
            tour_progress={tour_progress}
            total_tours={total_tours}
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
            {" "}
            <span className={styles.description}>Description:</span> {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Selected_POI_Page;
