// src/app/analytics/page.tsx
import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

import Head from "@/components/headerBar";
import AnalyticsHeader from "@/components/AnalyticsHeader";

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    return RedirectToSignIn({ redirectUrl: "/sign-in" }); // Redirect to default sign-in page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head />
      <AnalyticsHeader />
      <main className="p-6"></main>
    </div>
  );
}
