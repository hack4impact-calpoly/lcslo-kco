/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "@/styles/poiCard.module.css";
import React from "react";

interface POICardProps {
  title: string | null;
  duration: string | null;
  imageUrl: string | null;
}

function POICard({ title, duration, imageUrl }: POICardProps) {
  return (
    <div className={styles.base}>
      {/* Image Section */}
      <div className="rounded-t-2xl overflow-hidden w-full h-[112.81px]">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="object-cover w-full h-full"
        />
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
