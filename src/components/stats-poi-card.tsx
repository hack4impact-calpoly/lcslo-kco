import styles from "@/styles/stats-poi-card.module.css";
import { useEffect, useState } from "react";

interface StatsPoiCardProps {
  title: string;
  scans: number;
  visits: number;
  time: string;
  percentScans: number;
  percentVisits: number;
  percentTime: number;
}

export default function StatsPoiCard({
  title,
  scans,
  visits,
  time,
  percentScans,
  percentVisits,
  percentTime,
}: StatsPoiCardProps) {

const [views, setViews] = useState("Loading views...");
const [uniqueVisits, setUniqueVisits] = useState("0");
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
          count = count + data[i].total
          }
          setUniqueVisits((data.length+1).toString())
      setViews(count.toString())
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setViews("0");
      }
    };

    fetchViews(poiName);
  }, [poiName]);

  return (
    <div className={styles.container}>
      <span className={styles.name}>{title}</span>
      <div className={styles.card}>
        <div className={styles.scans}>
          <span className={styles.subtitle}>Total Scans</span>
          <span className={styles.mainStat}>{views}</span>
          <span className={styles.percent}>+{percentScans}% WoW</span>
        </div>
        <div className={styles.visits}>
          <span className={styles.subtitle}>Unique Visits</span>
          <span className={styles.mainStat}>{uniqueVisits}</span>
          <span className={styles.percent}>+{percentVisits}% WoW</span>
        </div>

        
      </div>
    </div>
  );
}
