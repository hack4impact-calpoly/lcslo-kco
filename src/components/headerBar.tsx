import styles from "@/styles/header.module.css";

export default function Head() {
  return (
    <header className={styles.head}>
      <div className={styles.full_bars}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <img src="Logo_Banner.png" className={styles.banner_img} />
    </header>
  );
}
