import style from "./Selected_POI_Page.module.css";
import Image from "next/image";

export default function Selected_POI_Page() {
  return (
    <div>
      <h1 className={style.name}>Point of Interest name</h1>
      <Image src={require("./lcslo_placeholder.jpg")} alt="Image of selected POI" />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque reprehenderit aliquam fuga repudiandae
        expedita provident ad, deserunt dolorum architecto voluptatum minus consequuntur amet animi, at nemo aspernatur
        labore corrupti. Laborum?
      </p>
    </div>
  );
}
