"use client";

import { Suspense } from "react"; // Import Suspense from React
import POICard from "@/components/POICard";
import { useParams, useSearchParams } from "next/navigation";

function POIDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;
  const name = searchParams.get("name");
  const duration = searchParams.get("duration");
  const imageUrl = searchParams.get("url");

  return (
    <div>
      <POICard title={name || "Unknown POI"} duration={duration || "Unknown Duration"} imageUrl={imageUrl}></POICard>
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
