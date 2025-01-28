import React from "react";
import { FaPlay } from "react-icons/fa";

export default function KeyStats() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* Play Audio Section */}
      <div className="flex flex-col items-center justify-center space-y-4 bg-[eeebe6] p-6 border-r-4 border-gray-300">
        <FaPlay className="h-12 w-12 text-[#c29669]" />
        <span className="text-xl font-medium text-center">Play Audio</span>
      </div>

      {/* Audio Duration Section */}
      <div className="flex flex-col items-center justify-center space-y-4 bg-[eeebe6] rounded-lg p-6 ">
        <span className="text-3xl font-bold text-black">2:30</span>
        <span className="text-xl font-medium text-center">Audio Duration</span>
      </div>

      {/* Tour Progress Section */}
      <div className="flex flex-col items-center justify-center space-y-4 bg-[eeebe6] p-6 border-l-4 border-gray-300">
        <div className="relative flex items-center justify-center w-24 h-24">
          <svg className="absolute transform rotate-90" width="75" height="75" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#c29669" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#d2b68e"
              strokeWidth="8"
              fill="none"
              strokeDasharray="282.7433388230814"
              strokeDashoffset="70"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute font-bold text-xl text-black">2/15</div>
        </div>
        <span className="text-xl font-medium text-center">Tour Progress</span>
      </div>
    </div>
  );
}
