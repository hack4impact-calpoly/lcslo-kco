// src/app/analytics/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Head from "@/components/headerBar";
import AnalyticsHeader from "@/components/AnalyticsHeader";

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/analytics");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head />
      <AnalyticsHeader />
      <main className="p-6"></main>
    </div>
  );
}
