"use client";
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import styles from "@/styles/poiList.module.css";
import { FaCheck } from "react-icons/fa";
import { POICard } from "@/components/poiCard";
import Link from "next/link";

interface POI {
  _id: string;
  name: string;
  description: string;
  audioField: string;
  duration: string;
  image: string;
  isComplete: boolean;
}

interface Audio {
  _id: string;
  name: string;
  url: string;
  duration: string;
  description: string;
  __v: number;
}

export default function POICardList() {
  const [cardsDone, setCardsDone] = useState(0);
  const [data, setData] = useState<POI[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        //fetch POI data
        const poiResponse = await fetch("/api/poi");
        const poiData = await poiResponse.json();

        //fetch audio data so we also have audio duration info
        const audioResponse = await fetch("/api/audiofile");
        const audioData = await audioResponse.json();

        // Create a lookup map using the name field
        const audioMap = Object.fromEntries(audioData.map((audio: Audio) => [audio.name, audio.duration]));

        // Merge POIs with corresponding audio durations based on name
        const mergedData = poiData.POIs.map((poi: POI) => ({
          ...poi,
          duration: audioMap[poi.name] || "0:00", // fallback of 0:00
        }));

        // Store in sessionStorage and update state
        sessionStorage.setItem("poiData", JSON.stringify(mergedData));
        setData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    //use sessionStorage if possible, otherwise make GET
    const storedData = sessionStorage.getItem("poiData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      sessionStorage.setItem("poiData", JSON.stringify(data));
      setCardsDone(data.filter((item) => item.isComplete).length);
    }
  }, [data]);

  const toggleComplete = (id: string) => {
    const updatedData = data.map((item) => (item._id === id ? { ...item, isComplete: !item.isComplete } : item));

    setData(updatedData);

    // Recalculate the number of completed cards
    setCardsDone(updatedData.filter((item) => item.isComplete).length);
  };

  // Defining a custom variant
  return (
    <div className={"flex-auto"}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>All Audios</h1>
        <h2 className={styles.headerSubtitle}>Kathleens Overlook Canyon</h2>
      </div>
      <div className={styles.base}>
        <div className={styles.topProgress}>
          <div className="text-black">
            Visited Spots: <span className="text-orange-400"> {cardsDone + "/" + data.length}</span>
          </div>
          <Progress value={data.length > 0 ? (cardsDone / data.length) * 100 : 0} colorPalette="orange" />
        </div>

        <div>
          {data.map((POI, index) => (
            <Link
              key={POI._id}
              href={{
                pathname: `/poi`,
                query: {
                  name: POI.name,
                  duration: POI.duration,
                  url: POI.image,
                  description: POI.description,
                  progress: cardsDone,
                  totalCards: data.length,
                },
              }}
            >
              <div className={styles.poicard}>
                <div className={styles.progressBar}>
                  {Array(4)
                    .fill(null)
                    .map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`${styles.dot} ${
                          POI.isComplete ? styles.dotCompleted : styles.dotNotCompleted
                        } ${index === 0 ? styles.hiddenDot : ""}`}
                      ></div>
                    ))}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleComplete(POI._id);
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      POI.isComplete ? styles.POIchecked : styles.POIdefault
                    }`}
                  >
                    {POI.isComplete && <FaCheck color="white" />}
                  </button>
                </div>
                <POICard title={POI.name} duration={POI.duration} imageUrl={POI.image}></POICard>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
