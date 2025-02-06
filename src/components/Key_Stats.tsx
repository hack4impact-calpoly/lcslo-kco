import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface KS_Porps {
  audio_link: string;
  duration_sec: number;
  tour_progress: number;
  total_tours: number;
}

const KeyStats: React.FC<KS_Porps> = ({ audio_link, duration_sec, tour_progress, total_tours }) => {
  const toursCompletedCnt = tour_progress; //To store no of tours completed so far
  const totalTourCnt = total_tours; //Count of all tours available
  const minutes = Math.floor(duration_sec / 60); //get mins of audio duration
  const seconds = duration_sec % 60; //get seconds of audio duration

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* Play Audio Section */}
      <div className="flex flex-col items-center justify-center space-y-4 bg-[eeebe6] p-6 border-r-4 border-gray-300">
        <Link href={audio_link}>
          <FaPlay className="h-12 w-12 text-[#c29669]" />
          <span className="text-xl font-medium text-center">Play Audio</span>
        </Link>
      </div>

      {/* Audio Duration Section */}
      <div className="flex flex-col items-center justify-center space-y-4 bg-[eeebe6] rounded-lg p-6 ">
        <span className="text-3xl font-bold text-black">
          {minutes}:{seconds}
        </span>
        <span className="text-xl font-medium text-center">Audio Duration</span>
      </div>

      {/* Tour Progress Section */
      /*NOTE: strokeDasharray is basically length of each stroke and the distance between them
      We require only 1 stroke, so we set it to the circumference of the circle (2 * PI * r)
      strokeDashoffset offsets the other end of the circle by the given units
      Length of arc to offset by is: (toursCompletedCnt / totalTourCnt) * Circumference
      Finally, we rotate the circle by -90 deg (rotation centered at radius), so it appears to start from right side
      Code might be cleaner if we assigned actual variables to coordinates, radius, defined a circumference variable, etc.*/}
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
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={(toursCompletedCnt / totalTourCnt) * 2 * Math.PI * 45}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute font-bold text-xl text-black">
            {toursCompletedCnt}/{totalTourCnt}
          </div>
        </div>
        <span className="text-xl font-medium text-center">Tour Progress</span>
      </div>
    </div>
  );
};

export default KeyStats;
