/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "@/styles/activityComponent.module.css";
import { IconButton, Select } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaChartLine } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

import { addDays, subDays, addWeeks, subWeeks, startOfWeek, endOfWeek, format } from "date-fns";

export function ActivityComponent({
  date,
  setDate,
  mode,
  setMode,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  mode: "Daily" | "Weekly";
  setMode: React.Dispatch<React.SetStateAction<"Daily" | "Weekly">>;
}) {
  const [maxViews, setMaxViews] = useState("Loading views...");
  const [poiName, setPoiName] = useState("Loading title...");

  useEffect(() => {
    const fetchViews = async (date: Date, mode: string) => {
      try {
        let startDate =
          mode === "Daily"
            ? new Date(date.getTime() - 24 * 60 * 60 * 1000)
            : new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

        const poiResponse = await fetch("/api/poi");
        const poiData = await poiResponse.json();

        // Run fetches in parallel
        const fetchPromises = poiData.POIs.map(async (poi: any) => {
          const title = poi.name;
          try {
            const response = await fetch(
              `/api/umami-stats?event=${encodeURIComponent(title + "-POI-Visited")}&startDate=${encodeURIComponent(startDate.toISOString())}&endDate=${encodeURIComponent(date.toISOString())}`,
            );

            if (!response.ok) {
              throw new Error(`Failed for ${title}`);
            }

            const data = await response.json();
            const count = Array.isArray(data) ? data.reduce((sum, d) => sum + (d.total || 0), 0) : 0;

            return { title, count };
          } catch (e) {
            console.error("Fetch error for POI:", title, e);
            return { title, count: 0 };
          }
        });

        const counts = await Promise.all(fetchPromises);
        const maxEntry = counts.reduce((max, curr) => (curr.count > max.count ? curr : max), {
          title: "",
          count: 0,
        });

        setMaxViews(maxEntry.count.toString());
        setPoiName(maxEntry.title);
      } catch (error) {
        console.error("Failed to fetch POI stats:", error);
        setMaxViews("0");
        setPoiName("Unavailable");
      }
    };

    fetchViews(date, mode);
  }, [date, mode]);

  const goPrev = () => {
    setDate((prev: Date) => (mode === "Daily" ? subDays(prev, 1) : subWeeks(prev, 1)));
  };

  const goNext = () => {
    setDate((prev) => (mode === "Daily" ? addDays(prev, 1) : addWeeks(prev, 1)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMode(value as "Daily" | "Weekly");
  };

  const getTimeframeText = () => {
    if (mode === "Daily") return format(date, "MMM d, yyyy");
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    console.log(end);
    return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
  };

  return (
    <div className={styles.activityComponent}>
      <div className={styles.activityTop}>
        <h2 className="text-xl font-semibold">Activity</h2>
        <div className="flex items-center bg-gray-300 rounded px-2 py-1 ml-2 mb-2">
          <MdOutlineDateRange className="text-gray-500" />
          <select value={mode} onChange={handleChange} className="outline-none bg-transparent text-sm font-medium">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
      </div>
      <div className={styles.activityTimeframe}>
        <h2>{getTimeframeText()}</h2>
        <div className={styles.timeframeButtons}>
          <IconButton aria-label="Go left" bg="gray.200" onClick={goPrev} size="2xs">
            <FaChevronLeft />
          </IconButton>
          <IconButton aria-label="Go right" bg="gray.200" onClick={goNext} size="2xs">
            <FaChevronRight />
          </IconButton>
        </div>
      </div>
      <div className={styles.activityInfo}>
        <div className={`bg-white p-4 rounded-lg ${styles.activityUnique}`}>
          <h3 className="text-sm font-medium">Total Unique Visitors</h3>
          <div className={styles.activityUniqueInfo}>
            <FaChartLine size={30} color="#44566D" />
            <h1 className="text-4xl font-medium p-2 text-[#44566D]">{maxViews}</h1>
          </div>
        </div>
        <div className={`bg-white p-4 rounded-lg ${styles.activityMostVisited}`}>
          <h3 className="text-sm font-medium">Most Visited POI</h3>
          <div className={styles.activityMostVisitedInfo}>
            <FaHeart size={30} color="#44566D" />
            <h1 className="text-sm font-medium p-2 text-[#44566D]">{poiName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
