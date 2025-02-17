/* eslint-disable @next/next/no-img-element */
import styles from "./POICard.module.css";
import React from "react";

interface POICardProps {
  title: string;
  duration: string;
  imageUrl: string;
}

function POICard({ title, duration, imageUrl }: POICardProps) {
  return (
    <div className={styles.base}>
      {/* Image Section */}
      <div className="rounded-t-2xl overflow-hidden w-full h-[112.81px]">
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

export default POICard;
