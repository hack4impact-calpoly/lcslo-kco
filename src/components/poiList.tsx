"use client";
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import styles from "@/styles/poiList.module.css";
import { FaCheck } from "react-icons/fa";
import { POICard } from "@/components/poiCard";
import Link from "next/link";
import React from "react";
import { BarLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(true);

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
        const urlMap = Object.fromEntries(audioData.map((audio: Audio) => [audio.name, audio.url]));
        // Merge POIs with corresponding audio durations based on name
        const mergedData = poiData.POIs.map((poi: POI) => ({
          ...poi,
          duration: audioMap[poi.name] || "0:00",
          audioField: urlMap[poi.name],
        }));

        // Store in sessionStorage and update state
        sessionStorage.setItem("poiData", JSON.stringify(mergedData));
        setData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    //use sessionStorage if possible, otherwise make GET
    const storedData = sessionStorage.getItem("poiData");
    if (storedData) {
      setData(JSON.parse(storedData));
      setLoading(false);
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Loading points of interest...</p>
        <BarLoader className={styles.loader} color="#D29561" width={150} height={6} />
      </div>
    );
  }
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
                  audioField: POI.audioField,
                  pid: POI._id,
                },
              }}
            >
              <div className={styles.dotExtraContainer}>
                {Array(2)
                  .fill(null)
                  .map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`${styles.dotExtra} ${
                        POI.isComplete ? styles.dotCompleted : styles.dotNotCompleted
                      } ${index === 0 ? styles.hiddenDot : ""}`}
                    ></div>
                  ))}
              </div>
              <div className={styles.poicard}>
                <div className={styles.progressBar}>
                  {Array(3)
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
                  {Array(3)
                    .fill(null)
                    .map((_, dotIndex) => {
                      const isNextCompleted = data[index + 1]?.isComplete ?? false;

                      return (
                        <div
                          key={dotIndex}
                          className={`${styles.dot} ${
                            isNextCompleted ? styles.dotCompleted : styles.dotNotCompleted
                          } ${index === data.length - 1 ? styles.hiddenDot : ""}`}
                        ></div>
                      );
                    })}
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
