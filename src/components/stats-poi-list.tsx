"use client";
import StatsPoiCard from "@/components/stats-poi-card";
import { useState, useEffect } from "react";
import styles from "@/styles/analytics-poi-list.module.css";

export default function StatsPoiList({ date, mode }: { date: Date; mode: "Daily" | "Weekly" }) {
  interface POI {
    _id: string;
    name: string;
    description: string;
    audioField: string;
    duration: string;
    image: string;
    isComplete: boolean;
  }

  const [data, setData] = useState<POI[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/poi");
        const poiData = await response.json();
        setData(poiData.POIs);
      } catch (error) {
        console.error("Error fetching POI data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.listContainer}>
      {data.map((poi) => (
        <StatsPoiCard
          key={poi._id}
          title={poi.name || "Unnamed POI"}
          scans={245}
          visits={15}
          time={poi.duration || "0:00"}
          percentScans={5}
          percentVisits={2}
          percentTime={1}
          date={date}
          mode={mode}
        />
      ))}
    </div>
  );
}
