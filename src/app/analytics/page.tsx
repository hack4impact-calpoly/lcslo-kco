// src/app/analytics/page.tsx
import Head from "@/components/headerBar";
import AnalyticsHeader from "@/components/AnalyticsHeader";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AnalyticsPage() {
  const fetchAuth = async () => {
    const authData = await auth();
    if (!authData.userId) {
      redirect("/sign-in?redirect_url=/analytics");
    }
  };

  fetchAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your existing header - unchanged */}
      <Head />

      {/* New analytics header */}
      <AnalyticsHeader />

      {/* Page content */}
      <main className="p-6"></main>
    </div>
  );
}
