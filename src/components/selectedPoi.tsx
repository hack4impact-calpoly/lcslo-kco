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
  const [isAudioVisible, setIsAudioVisible] = useState(false);

  const toggleAudioPlayer = () => {
    setIsAudioVisible((prev) => !prev);
  };

  const [newTourProgress, updateTourProgress] = useState(tour_progress);

  //When a card is selected, it should be marked as done in sessionStorage
  try {
    //Get locally stored data
    const storedData = sessionStorage.getItem("poiData");

    if (storedData) {
      const data: POI[] = JSON.parse(storedData);

      //Update tour progression and local data, if required
      const updatedData = data.map((item) => {
        if (item._id === id && !item.isComplete) {
          updateTourProgress(tour_progress + 1);
          return { ...item, isComplete: true };
        } else {
          return item;
        }
      });

      //Save updated local data
      sessionStorage.setItem("poiData", JSON.stringify(updatedData));
    }
  } catch (error) {
    console.log("Error Updating Progress:", error);
  }

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
            tour_progress={newTourProgress}
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
