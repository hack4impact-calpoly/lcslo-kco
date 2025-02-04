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
  toursCompleted: number;
  totalTours: number;
}
const OverlayImage: React.FC<OverlayImageProps> = ({ src, header }) => {
  return (
    <div className="flex flex-col z-20">
      <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[110%] text-white text-3xl font whitespace-nowrap">
        {header}
      </h1>
      <img
        src={src}
        alt="Overlay"
        className="absolute top-0 left-1/2 transform translate-y-[70%] -translate-x-1/2 w-1/2 rounded-xl border-white border-4"
      />
    </div>
  );
};

const Selected_POI_Page: React.FC<POIProps> = ({ mainImage, name, toursCompleted, totalTours, content }) => {
  return (
    <div className="w-full h-screen flex flex-col relative bg-black">
      {/* first div with main image and overlay image*/}
      <div className="flex items-center justify-center h-[20%]">
        <img src={mainImage} alt="Main" className="w-full h-full object-cover blur-[1.65px] filter brightness-[70%]" />
        <OverlayImage src={mainImage} header={name} />
      </div>

      {/* second div (left blank for subcomponent) */}
      <div className="flex-1 rounded-tl-3xl rounded-tr-3xl -mt-8 z-10 bg-[#F0EBE7] overflow-visible">
        <KeyStats toursCompletedCnt={toursCompleted} totalTourCnt={totalTours} />
        <p className="text-[#1C1C1C] ml-5 mr-5">{content}</p>
      </div>
    </div>
  );
};

export default Selected_POI_Page;
