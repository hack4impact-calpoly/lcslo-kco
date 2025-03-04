import AudioControls from "@/components/AudioControls";
import Navbar from "@/components/Navbar";
import POICardList from "@/components/poiList";

export default function Home() {
  return (
    <main>
      <Navbar />
      <POICardList></POICardList>
    </main>
  );
}
