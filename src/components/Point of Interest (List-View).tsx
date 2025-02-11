/* eslint-disable @next/next/no-img-element */
import React from "react";

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
  // Placeholder data
  const poi = {
    title: "Point of interest's name",
    duration: "2:15 min",
    imageUrl:
      "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div className="POICard">
      <POICard title={poi.title} duration={poi.duration} imageUrl={poi.imageUrl} />
    </div>
  );
}

export default POIListView;
