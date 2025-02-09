"use client";

import { Suspense } from "react"; // Import Suspense from React
import { useParams, useSearchParams } from "next/navigation";
import Selected_POI_Page from "@/components/selectedPoi";

function POIDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;
  const name = searchParams.get("name");
  const duration = searchParams.get("duration");
  const imageUrl = searchParams.get("url");
  const description = searchParams.get("description");
  const progress = parseInt(searchParams.get("progress") || "0", 10);
  const totalPois = parseInt(searchParams.get("totalCards") || "0", 10);

  return (
    <div>
      <Selected_POI_Page
        mainImage={imageUrl || ""}
        name={name || "Unknown POI"}
        content={description || "Description"}
        audio_link={imageUrl || "link"}
        duration={duration || "0:00"}
        tour_progress={progress}
        total_tours={totalPois}
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
