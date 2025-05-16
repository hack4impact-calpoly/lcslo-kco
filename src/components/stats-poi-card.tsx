import styles from "@/styles/stats-poi-card.module.css";

interface StatsPoiCardProps {
  title: string;
  scans: number;
  visits: number;
  time: string;
  percentScans: number;
  percentVisits: number;
  percentTime: number;
}

export default function StatsPoiCard({
  title,
  scans,
  visits,
  time,
  percentScans,
  percentVisits,
  percentTime,
}: StatsPoiCardProps) {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{title}</span>
      <div className={styles.card}>
        <div className={styles.scans}>
          <span className={styles.subtitle}>Total Scans</span>
          <span className={styles.mainStat}>{scans}</span>
          <span className={styles.percent}>+{percentScans}% WoW</span>
        </div>
        <div className={styles.visits}>
          <span className={styles.subtitle}>Unique Visits</span>
          <span className={styles.mainStat}>{visits}</span>
          <span className={styles.percent}>+{percentVisits}% WoW</span>
        </div>

        <div className={styles.time}>
          <span className={styles.subtitle}>Average Time</span>
          <span className={styles.mainStat}>{time}</span>
          <span className={styles.percent}>+{percentTime}% WoW</span>
        </div>
      </div>
    </div>
  );
}
