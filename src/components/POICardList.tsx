"use client";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import styles from "./POICardList.module.css";

export default function POICardList() {
  const [cardsDone, setCardsDone] = useState(0);
  const [data, setData] = useState([
    {
      _id: "1",
      name: "Eiffel Tower",
      description:
        "A wrought-iron lattice tower in Paris, France, known for its stunning architecture and panoramic views.",
      audioField: "eiffel_tower_audio.mp3",
      isComplete: true,
    },
    {
      _id: "2",
      name: "Great Wall of China",
      description: "A historic fortification stretching across China, built to protect against invasions.",
      audioField: "great_wall_audio.mp3",
      isComplete: false,
    },
    {
      _id: "3",
      name: "Machu Picchu",
      description:
        "An ancient Incan citadel set high in the Andes Mountains in Peru, known for its breathtaking ruins.",
      audioField: "machu_picchu_audio.mp3",
      isComplete: true,
    },
    {
      _id: "4",
      name: "Colosseum",
      description:
        "A massive ancient amphitheater in Rome, Italy, once used for gladiatorial contests and public spectacles.",
      audioField: "colosseum_audio.mp3",
      isComplete: false,
    },
    {
      _id: "5",
      name: "Statue of Liberty",
      description: "A symbol of freedom and democracy, located on Liberty Island in New York Harbor.",
      audioField: "statue_liberty_audio.mp3",
      isComplete: true,
    },
    {
      _id: "6",
      name: "Taj Mahal",
      description:
        "A stunning white marble mausoleum in India, built by Mughal Emperor Shah Jahan in memory of his wife.",
      audioField: "taj_mahal_audio.mp3",
      isComplete: true,
    },
    {
      _id: "7",
      name: "Christ the Redeemer",
      description:
        "A colossal statue of Jesus Christ in Rio de Janeiro, Brazil, overlooking the city from Mount Corcovado.",
      audioField: "christ_redeemer_audio.mp3",
      isComplete: false,
    },
    {
      _id: "8",
      name: "Sydney Opera House",
      description:
        "An architectural masterpiece in Australia, known for its sail-like design and world-class performances.",
      audioField: "sydney_opera_audio.mp3",
      isComplete: true,
    },
    {
      _id: "9",
      name: "Pyramids of Giza",
      description: "One of the Seven Wonders of the Ancient World, located in Egypt and built as tombs for pharaohs.",
      audioField: "pyramids_giza_audio.mp3",
      isComplete: false,
    },
    {
      _id: "10",
      name: "Niagara Falls",
      description:
        "A powerful set of waterfalls on the border of the USA and Canada, attracting millions of visitors each year.",
      audioField: "niagara_falls_audio.mp3",
      isComplete: true,
    },
    {
      _id: "11",
      name: "Grand Canyon",
      description:
        "A breathtaking natural wonder in Arizona, USA, carved by the Colorado River over millions of years.",
      audioField: "grand_canyon_audio.mp3",
      isComplete: false,
    },
    {
      _id: "12",
      name: "Mount Everest",
      description:
        "The tallest mountain in the world, located in the Himalayas, attracting climbers from around the globe.",
      audioField: "mount_everest_audio.mp3",
      isComplete: true,
    },
    {
      _id: "13",
      name: "Stonehenge",
      description: "A mysterious prehistoric stone circle in England, believed to have been used for ceremonies.",
      audioField: "stonehenge_audio.mp3",
      isComplete: false,
    },
    {
      _id: "14",
      name: "The Louvre Museum",
      description: "A world-famous museum in Paris, home to iconic artworks like the Mona Lisa and the Venus de Milo.",
      audioField: "louvre_museum_audio.mp3",
      isComplete: true,
    },
    {
      _id: "15",
      name: "Chichen Itza",
      description: "A significant Mayan archaeological site in Mexico, featuring the famous pyramid El Castillo.",
      audioField: "chichen_itza_audio.mp3",
      isComplete: false,
    },
  ]);

  // Defining a custom variant
  return (
    <div>
      <div>
        <h1>All Audios</h1>
        <h2>Kathleens Overlook Canyon</h2>
      </div>
      <div>
        <div>
          <h1>Tour Progress: {cardsDone + " / " + data.length}</h1>
          <Progress value={(cardsDone / data.length) * 100} />
        </div>

        <div>
          {data.map((POI) => (
            <div key={POI._id}>
              <Checkbox className={styles.checkbox}></Checkbox>
              <h2>{POI.name}</h2>
              <p>{POI.description}</p>
              <p>Status: {POI.isComplete ? "Completed" : "Not Completed"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
