import styles from "@/styles/analytics-poi-card.module.css";
import { log } from "console";
import { useEffect, useState } from "react";
import { FaPencilRuler, FaTrash } from "react-icons/fa";

interface AnaylticsPoiCardProps {
  title: string;
  imageUrl: string;
  scans: number;
  duration: string;
}

export default function AnalyticsPoiCard({ title, imageUrl, scans, duration }: AnaylticsPoiCardProps) {
  const [views, setViews] = useState("Loading views...");

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/umami/`);
        const data = await response.json();
        console.log(data);
        setViews(data[0].total);
      } catch (error) {
        console.error("Failed to fetch transcript:", error);
        setViews("Error fetching transcript.");
      }
    };

    fetchViews();
  }, []);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt="POI Image" width={90} height={90} className={styles.cardImage} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.stats}>
          <span className={styles.statsText}>{views} scans this month</span>
          <span className={styles.statsText}>{duration} min</span>
        </div>
        <div className={styles.actions}>
          {/* <button className={styles.iconButton}>
            <FaPencilRuler color="#000000" />
            <span className={styles.buttonText}>Edit</span>
          </button> */}
          {/* <button className={styles.iconButton}>
            <FaTrash color="#000000" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
