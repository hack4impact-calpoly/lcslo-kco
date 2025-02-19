"use client";

import { Suspense } from "react"; // Import Suspense from React
import POICard from "@/components/POICard";
import { useParams, useSearchParams } from "next/navigation";
import Selected_POI_Page from "@/components/Selected_POI_Page";

function POIDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;
  const name = searchParams.get("name");
  const duration = searchParams.get("duration");
  const imageUrl = searchParams.get("url");
  const description = searchParams.get("description");

  return (
    <div>
      <Selected_POI_Page
        mainImage={imageUrl || ""}
        name={name || "Unknown POI"}
        content={description || "Description"}
        audio_link="link"
        duration={duration || "0:00"}
        tour_progress={2}
        total_tours={15}
      />
    </div>
  );
}

export default function POIDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <POIDetailContent />
    </Suspense>
  );
}
