"use client";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import styles from "./POICardList.module.css";
import { FaCheck } from "react-icons/fa";
import POICard from "./POICard";
import Link from "next/link";

export default function POICardList() {
  const [cardsDone, setCardsDone] = useState(0);
  const [data, setData] = useState([
    {
      _id: "1",
      name: "Eiffel Tower",
      description:
        "A wrought-iron lattice tower in Paris, France, known for its stunning architecture and panoramic views.",
      audioField: "eiffel_tower_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "2",
      name: "Great Wall of China",
      description: "A historic fortification stretching across China, built to protect against invasions.",
      audioField: "great_wall_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
    {
      _id: "3",
      name: "Machu Picchu",
      description:
        "An ancient Incan citadel set high in the Andes Mountains in Peru, known for its breathtaking ruins.",
      audioField: "machu_picchu_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "4",
      name: "Colosseum",
      description:
        "A massive ancient amphitheater in Rome, Italy, once used for gladiatorial contests and public spectacles.",
      audioField: "colosseum_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
    {
      _id: "5",
      name: "Statue of Liberty",
      description: "A symbol of freedom and democracy, located on Liberty Island in New York Harbor.",
      audioField: "statue_liberty_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "6",
      name: "Taj Mahal",
      description:
        "A stunning white marble mausoleum in India, built by Mughal Emperor Shah Jahan in memory of his wife.",
      audioField: "taj_mahal_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "7",
      name: "Christ the Redeemer",
      description:
        "A colossal statue of Jesus Christ in Rio de Janeiro, Brazil, overlooking the city from Mount Corcovado.",
      audioField: "christ_redeemer_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
    {
      _id: "8",
      name: "Sydney Opera House",
      description:
        "An architectural masterpiece in Australia, known for its sail-like design and world-class performances.",
      audioField: "sydney_opera_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "9",
      name: "Pyramids of Giza",
      description: "One of the Seven Wonders of the Ancient World, located in Egypt and built as tombs for pharaohs.",
      audioField: "pyramids_giza_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
    {
      _id: "10",
      name: "Niagara Falls",
      description:
        "A powerful set of waterfalls on the border of the USA and Canada, attracting millions of visitors each year.",
      audioField: "niagara_falls_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "11",
      name: "Grand Canyon",
      description:
        "A breathtaking natural wonder in Arizona, USA, carved by the Colorado River over millions of years.",
      audioField: "grand_canyon_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
    {
      _id: "12",
      name: "Mount Everest",
      description:
        "The tallest mountain in the world, located in the Himalayas, attracting climbers from around the globe.",
      audioField: "mount_everest_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "13",
      name: "Stonehenge",
      description: "A mysterious prehistoric stone circle in England, believed to have been used for ceremonies.",
      audioField: "stonehenge_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
    {
      _id: "14",
      name: "The Louvre Museum",
      description: "A world-famous museum in Paris, home to iconic artworks like the Mona Lisa and the Venus de Milo.",
      audioField: "louvre_museum_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: true,
    },
    {
      _id: "15",
      name: "Chichen Itza",
      description: "A significant Mayan archaeological site in Mexico, featuring the famous pyramid El Castillo.",
      audioField: "chichen_itza_audio.mp3",
      duration: "1:00",
      imageUrl:
        "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isComplete: false,
    },
  ]);

  const toggleComplete = (id: string) => {
    const clickedIndex = data.findIndex((item) => item._id === id);

    const isCurrentlyComplete = data[clickedIndex].isComplete;
    const updatedData = data.map((item, index) => {
      if (isCurrentlyComplete) {
        // If the checkbox is checked, toggle the clicked one and everything after it off
        if (index >= clickedIndex) {
          return { ...item, isComplete: false };
        }
      } else {
        // If the checkbox is not checked, toggle the clicked one and everything before it on
        if (index <= clickedIndex) {
          return { ...item, isComplete: true };
        }
      }
      return item; // Leave all other items as they are
    });
    setData(updatedData);

    const updatedCardsDone = updatedData.filter((item) => item.isComplete).length;
    setCardsDone(updatedCardsDone);
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
            Visited Spots: <span className="text-orange-400"> {cardsDone + " / " + data.length}</span>
          </div>
          <Progress value={(cardsDone / data.length) * 100} colorPalette="orange" />
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
                  url: POI.imageUrl,
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
                    onClick={() => toggleComplete(POI._id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      POI.isComplete ? styles.POIchecked : styles.POIdefault
                    }`}
                  >
                    {POI.isComplete && <FaCheck color="white" />}
                  </button>
                </div>
                <POICard title={POI.name} duration={POI.duration} imageUrl={POI.imageUrl}></POICard>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
