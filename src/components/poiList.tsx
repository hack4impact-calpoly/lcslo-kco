"use client";
import React, { useEffect, useState } from "react";
import POIModel from "@/database/models/POISchema";
import mongoose from "mongoose";

interface POICardProps {
  title: string;
  duration: string;
  imageUrl: string;
}

function POICard({ title, duration, imageUrl }: POICardProps) {
  return (
    <div className="relative bg-black rounded-2xl p-1 w-[324.07px] h-[178.44px]">
      {/* Image Section */}
      <div className="rounded-t-2xl overflow-hidden w-full h-[112.81px]">
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-b-2xl p-2 w-full h-[66.66px]">
        <h3 className="text-lg font-semibold text-black ml-1.5">{title}</h3>
        <p className="text-sm text-gray-500 ml-1.5">{duration}</p>
      </div>
    </div>
  );
}

function POIListView() {
  const [poiList, setPoiList] = useState<POICardProps[]>([]);

  useEffect(() => {
    async function fetchPOIs() {
      try {
        const res = await fetch("/api/poi"); // API route
        const data = await res.json();
        setPoiList(
          data.map((poi: any) => ({
            title: poi.name,
            duration: poi.audioFile?.duration || "N/A",
            imageUrl: poi.image || "https://via.placeholder.com/300",
          })),
        );
      } catch (error) {
        console.error("Failed to fetch POIs:", error);
      }
    }

    fetchPOIs();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {poiList.map((poi, index) => (
        <POICard key={index} title={poi.title} duration={poi.duration} imageUrl={poi.imageUrl} />
      ))}
    </div>
  );
}

export default POIListView;
