import React from "react";
import KeyStats from "./Key_Stats";
import styles from "./Selected_POI_Page.module.css";

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
            duration={duration}
            tour_progress={tour_progress}
            total_tours={total_tours}
          />
        </div>
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
