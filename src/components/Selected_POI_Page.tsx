import Image from "next/image";
import Key_Stats from "./Key_Stats";

export default function Selected_POI_Page() {
  return (
    <div className="m-4 border-2 flex flex-col items-center" style={{ backgroundColor: "#eeebe6" }}>
      <h1 className="text-center whitespace-nowrap w-full mt-5 mb-5 text-white text-2xl font-bold tracking-wide">
        Point of Interest Name
      </h1>
      <div>
        <Image
          src={require("./lcslo_placeholder.jpg")}
          alt="Image of selected POI"
          className="border-white border-8 rounded-xl"
        />
      </div>
      <Key_Stats></Key_Stats>
      <p className="m-4 text-black">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque reprehenderit aliquam fuga repudiandae
        expedita provident ad, deserunt dolorum architecto voluptatum minus consequuntur amet animi, at nemo aspernatur
        labore corrupti. Laborum?
      </p>
    </div>
  );
}
