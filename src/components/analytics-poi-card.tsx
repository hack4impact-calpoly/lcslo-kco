import styles from "@/styles/analytics-poi-card.module.css";
import { log } from "console";
import { useEffect, useState } from "react";
import { FaPencilRuler, FaTrash } from "react-icons/fa";

interface AnalyticsPoiCardProps {
  title: string;
  imageUrl: string;
  scans: number;
}

export default function AnalyticsPoiCard({ title, imageUrl, scans }: AnalyticsPoiCardProps) {
  const [views, setViews] = useState("Loading views...");
  const [poiName, setPoiName] = useState(title);

  useEffect(() => {
    const fetchViews = async (name: string) => {
      try {
        const response = await fetch(`/api/umami?event=${encodeURIComponent(name + "-POI-Visited")}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${errorText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || !data[0]?.total) {
          throw new Error("Unexpected data format");
        }
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          count = count + data[i].total;
        }
        setViews(count.toString());
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setViews("0");
      }
    };

    fetchViews(poiName);
  }, [poiName]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt="POI Image" width={90} height={90} className={styles.cardImage} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.stats}>
          <span className={styles.statsText}>{views} scans this month</span>
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
