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

  // Dummy data for POIs
  const poiData = [
    {
      name: "Norm Hammond Dunites",
      totalScans: 15,
      uniqueVisits: 2,
      averageTime: "2:23",
      totalScansTrend: 1,
      uniqueVisitsTrend: 12,
      avgTimeTrend: 2.5,
    },
    {
      name: "Lindsey Plants",
      totalScans: 10,
      uniqueVisits: 10,
      averageTime: "1:13",
      totalScansTrend: 10,
      uniqueVisitsTrend: 10,
      avgTimeTrend: 1.5,
    },
    {
      name: "Kaila Welcome",
      totalScans: 22,
      uniqueVisits: 15,
      averageTime: "3:45",
      totalScansTrend: 5,
      uniqueVisitsTrend: 8,
      avgTimeTrend: 0.7,
    },
    {
      name: "River Walk",
      totalScans: 18,
      uniqueVisits: 12,
      averageTime: "1:55",
      totalScansTrend: 3,
      uniqueVisitsTrend: 6,
      avgTimeTrend: 1.2,
    },
  ];

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
        <div className="flex items-center bg-gray-300 rounded px-2 py-1 shadow-sm ml-2 mb-2">
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
        <div className={`bg-white p-4 rounded-lg shadow ${styles.activityUnique}`}>
          <h3 className="text-sm font-medium">Total Unique Visitors</h3>
          <div className={styles.activityUniqueInfo}>
            <FaChartLine size={30} />
            <h1 className="text-4xl font-medium p-2">112</h1>
          </div>
          <h2 className="text-xs text-green-600 font-medium ml-11">↑12% WoW</h2>
        </div>
        <div className={`bg-white p-4 rounded-lg shadow ${styles.activityMostVisited}`}>
          <h3 className="text-sm font-medium">Most Visited POI</h3>
          <div className={styles.activityMostVisitedInfo}>
            <FaHeart size={30} />
            <h1 className="text-sm font-medium p-2">Kaila Welcome</h1>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {poiData.map((poi, index) => (
          <div key={index} className="rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{poi.name}</h3>

            <div className="bg-white rounded-lg p-2 grid grid-cols-3 gap-2">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Scans</p>
                <p className="text-2xl font-medium text-green-700">{poi.totalScans}</p>
                <p className="text-xs text-green-600">↑ {poi.totalScansTrend}% WoW</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium">Unique Visits</p>
                <p className="text-2xl font-medium text-green-700">{poi.uniqueVisits}</p>
                <p className="text-xs text-green-600">↑ {poi.uniqueVisitsTrend}% WoW</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium">Average Time</p>
                <p className="text-2xl font-medium text-green-700">{poi.averageTime} min</p>
                <p className="text-xs text-green-600">↑ {poi.avgTimeTrend}% WoW</p>
              </div>
            </div>
            <hr className="my-4 border-t border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
