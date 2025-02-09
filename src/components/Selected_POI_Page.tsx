import React from "react";
import KeyStats from "./Key_Stats";

interface OverlayImageProps {
  src: string;
  header: string;
}

interface POIProps {
  mainImage: string;
  name: string;
  content: string;
  audio_link: string;
  duration_sec: number;
  tour_progress: number;
  total_tours: number;
}

const OverlayImage: React.FC<OverlayImageProps> = ({ src, header }) => {
  return (
    <div className="flex flex-col z-30">
      <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[160%] text-white text-3xl font whitespace-nowrap">
        {header}
      </h1>
      <img
        src={src}
        alt="Overlay"
        className="relative -mt-10 z-20 top-0 left-1/2 transform translate-y-[-50%] -translate-x-1/2 w-3/5 rounded-xl border-white border-4"
      />
    </div>
  );
};

const Selected_POI_Page: React.FC<POIProps> = ({
  mainImage,
  name,
  content,
  audio_link,
  duration_sec,
  tour_progress,
  total_tours,
}) => {
  return (
    <div className="w-full h-screen flex flex-col relative bg-black">
      {/* first div with main image and overlay image*/}
      <div className="flex items-center justify-center h-[30%]">
        <img src={mainImage} alt="Main" className="w-full h-full object-cover blur-[1.65px] filter brightness-[70%]" />
      </div>

      {/* second div (left blank for subcomponent) */}
      <div className="flex-1 rounded-tl-3xl rounded-tr-3xl -mt-8 z-10 bg-[#F0EBE7] overflow-visible">
        <OverlayImage src={mainImage} header={name} />
        <div className="transform translate-y-[-30%]">
          <KeyStats
            audio_link={audio_link}
            duration_sec={duration_sec}
            tour_progress={tour_progress}
            total_tours={total_tours}
          />
          <p className="text-[#1C1C1C] ml-5 mr-5">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Selected_POI_Page;
