import styles from "@/styles/header.module.css";
import SideBar from "./SideBar";

export default function Head() {
  return (
    <div className={styles.head}>
      <div>
        <SideBar></SideBar>
      </div>

      <img src="Logo_Banner.png" className={styles.banner_img} />
    </div>
  );
}
