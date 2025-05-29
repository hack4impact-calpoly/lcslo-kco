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
  date: Date;
  mode: "Daily" | "Weekly";
}

export default function StatsPoiCard({
  title,
  scans,
  visits,
  time,
  percentScans,
  percentVisits,
  percentTime,
  date,
  mode,
}: StatsPoiCardProps) {
  const [views, setViews] = useState("Loading views...");
  const [uniqueVisits, setUniqueVisits] = useState("0");
  const [poiName, setPoiName] = useState(title);

  useEffect(() => {
    const fetchViews = async (name: string) => {
      try {
        let startDate = date;
        if (mode === "Daily") {
          startDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        }
        if (mode === "Weekly") {
          startDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        }

        const response = await fetch(
          `/api/umami-stats?event=${encodeURIComponent(title + "-POI-Visited")}&startDate=${encodeURIComponent(startDate.toISOString())}&endDate=${encodeURIComponent(date.toISOString())}`,
        );
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
        setUniqueVisits((data.length + 1).toString());
        setViews(count.toString());
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setViews("0");
        setUniqueVisits("0");
      }
    };

    fetchViews(poiName);
  }, [poiName, date, mode, title]);

  return (
    <div className={styles.container}>
      <span className={styles.name}>{title}</span>
      <div className={styles.card}>
        <div className={styles.scans}>
          <span className={styles.subtitle}>Total Scans</span>
          <span className={styles.mainStat}>{views}</span>
        </div>
        <div className={styles.visits}>
          <span className={styles.subtitle}>Unique Visits</span>
          <span className={styles.mainStat}>{uniqueVisits}</span>
        </div>
      </div>
    </div>
  );
}
