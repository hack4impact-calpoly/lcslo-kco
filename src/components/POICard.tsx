/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./POICard.module.css";

interface POICardProps {
  title: string;
  duration: string;
  imageUrl: string;
}

function POICard({ title, duration, imageUrl }: POICardProps) {
  return (
    <div className={`${styles.card} relative`}>
      {/* Image Section */}
      <div className={`${styles.imageContainer} overflow-hidden`}>
        <img src={imageUrl} alt={title} className={`${styles.image}`} />
      </div>

      {/* Content Section */}
      <div className={`${styles.content} p-2`}>
        <h3 className={`${styles.title}`}>{title}</h3>
        <p className={`${styles.duration}`}>{duration}</p>
      </div>
    </div>
  );
}

function POIListView() {
  // Placeholder data
  const poi = {
    title: "Point of interest's name",
    duration: "2:15 min",
    imageUrl:
      "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div className={styles.poiList}>
      <POICard title={poi.title} duration={poi.duration} imageUrl={poi.imageUrl} />
    </div>
  );
}

export default POIListView;
