import styles from "@/styles/analytics-poi-card.module.css";
import { FaPencilRuler, FaTrash } from "react-icons/fa";

interface AnaylticsPoiCardProps {
  title: string;
  imageUrl: string;
  scans: number;
  duration: string;
}

export default function AnalyticsPoiCard({ title, imageUrl, scans, duration }: AnaylticsPoiCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt="POI Image" width={90} height={90} className={styles.cardImage} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.stats}>
          <span className={styles.statsText}>{scans} scans this month</span>
          <span className={styles.statsText}>{duration} min</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconButton}>
            <FaPencilRuler color="#000000" />
            <span className={styles.buttonText}>Edit</span>
          </button>
          <button className={styles.iconButton}>
            <FaTrash color="#000000" />
          </button>
        </div>
      </div>
    </div>
  );
}
