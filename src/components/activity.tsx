/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useState } from "react";
import styles from "@/styles/activityComponent.module.css";
import { IconButton, Select } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaChartLine } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

import { addDays, subDays, addWeeks, subWeeks, startOfWeek, endOfWeek, format } from "date-fns";

export function ActivityComponent() {
  const [mode, setMode] = useState("Daily");
  const [date, setDate] = useState(new Date());

  const goPrev = () => {
    setDate((prev) => (mode === "Daily" ? subDays(prev, 1) : subWeeks(prev, 1)));
  };

  const goNext = () => {
    setDate((prev) => (mode === "Daily" ? addDays(prev, 1) : addWeeks(prev, 1)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMode(value);
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
            <h1 className="text-4xl font-medium p-2 text-[#44566D]">112</h1>
          </div>
          <h2 className="text-xs text-[#577c37] font-medium ml-11">↑12% WoW</h2>
        </div>
        <div className={`bg-white p-4 rounded-lg ${styles.activityMostVisited}`}>
          <h3 className="text-sm font-medium">Most Visited POI</h3>
          <div className={styles.activityMostVisitedInfo}>
            <FaHeart size={30} color="#44566D" />
            <h1 className="text-sm font-medium p-2 text-[#44566D]">Kaila Welcome</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
