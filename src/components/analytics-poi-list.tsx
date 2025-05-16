"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/analytics-poi-list.module.css";
import AnalyticsPoiCard from "@/components/analytics-poi-card";

export default function AnalyticsPoiList() {
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
        <AnalyticsPoiCard
          key={poi._id}
          imageUrl={poi.image || "/placeholder.jpg"}
          title={poi.name || "Unnamed POI"}
          duration="0:58"
          scans={245}
        />
      ))}
    </div>
  );
}
