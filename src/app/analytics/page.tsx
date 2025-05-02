// src/app/analytics/page.tsx
import Head from "@/components/headerBar";
import AnalyticsHeader from "@/components/AnalyticsHeader";

export default function AnalyticsPage() {
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
