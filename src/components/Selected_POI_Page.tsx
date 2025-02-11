import React from "react";
import KeyStats from "./Key_Stats";
import styles from "./Selected_POI_Page.module.css";

interface OverlayImageProps {
  src: string;
  header: string;
}

interface POIProps {
  mainImage: string;
  name: string;
  content: string;
  audio_link: string;
  duration_sec: number;
  tour_progress: number;
  total_tours: number;
}

//Subcomponent to display image (unblurred) and header of the POI name
const OverlayImage: React.FC<OverlayImageProps> = ({ src, header }) => {
  return (
    <div className={styles.overlayContainer}>
      <h1 className={styles.overlayHeader}>{header}</h1>
      <img src={src} alt="Overlay" className={styles.overlayImage} />
    </div>
  );
};

//Main component containing Key_Stats subcomponent, and content
const Selected_POI_Page: React.FC<POIProps> = ({
  mainImage,
  name,
  content,
  audio_link,
  duration_sec,
  tour_progress,
  total_tours,
}) => {
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
            duration_sec={duration_sec}
            tour_progress={tour_progress}
            total_tours={total_tours}
          />
          <p className={styles.textContent}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Selected_POI_Page;
