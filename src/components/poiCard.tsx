/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "@/styles/poiCard.module.css";

interface POICardProps {
  title: string;
  duration: string;
  imageUrl: string;
}

export function POICard({ title, duration, imageUrl }: POICardProps) {
  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.duration}>{duration}</p>
      </div>
    </div>
  );
}
