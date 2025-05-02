// src/app/analytics/page.tsx
"use client";

import { useState } from "react";
import { FiTrendingUp, FiMap, FiRefreshCw, FiCheck } from "react-icons/fi";

type TabType = "analytics" | "poi";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("analytics");
  const [lastUpdated, setLastUpdated] = useState<string>("May 1, 2025");

  const handleRefresh = () => {
    setLastUpdated(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-gray-900">LCSLO Admin Dashboard</h1>

        <div className="flex items-center gap-4 mt-1 mb-6">
          <div className="flex items-center gap-1 bg-green-800 text-white px-2 py-0.5 rounded-md">
            <span className="relative w-3 h-3 flex items-center justify-center">
              <span className="absolute w-2 h-2 bg-white rounded-full"></span>
              <FiCheck className="absolute text-green-800" size={8} />
            </span>
            <span className="text-xs font-medium">Live</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Last Updated: {lastUpdated}</span>
            <FiRefreshCw
              size={12}
              className="text-orange-500 hover:text-orange-600 cursor-pointer transition-colors"
              onClick={handleRefresh}
            />
          </div>
        </div>

        {/* Larger switch rectangle */}
        <div className="flex justify-center">
          <div className="relative bg-gray-100 rounded-lg p-1.5 inline-flex" style={{ width: "320px" }}>
            {/* Animated background slider - now larger */}
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-md bg-white shadow-sm transition-all duration-300 ease-in-out ${
                activeTab === "analytics" ? "left-1.5 w-[154px]" : "left-[161px] w-[154px]"
              }`}
            ></div>

            <TabButton
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
              icon={<FiTrendingUp size={18} className="mr-2" />}
              width="154px"
            >
              Analytics
            </TabButton>
            <TabButton
              active={activeTab === "poi"}
              onClick={() => setActiveTab("poi")}
              icon={<FiMap size={18} className="mr-2" />}
              width="154px"
            >
              Points of Interest
            </TabButton>
          </div>
        </div>
      </div>

      <main className="p-6">
        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === "analytics" ? (
            <h2 className="text-lg font-medium">Analytics Content Goes Here</h2>
          ) : (
            <h2 className="text-lg font-medium">POI Content Goes Here</h2>
          )}
        </div>
      </main>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
  icon,
  width,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  width: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative z-10 flex items-center justify-center py-2.5 rounded-md
        transition-colors duration-300 ease-in-out text-sm
        ${active ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"}
      `}
      style={{ width }}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{children}</span>
      </div>
    </button>
  );
}
