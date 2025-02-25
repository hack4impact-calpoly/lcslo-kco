import Navbar from "@/components/Navbar";
import POICardList from "@/components/poiList";
import Head from "@/components/headerBar";

export default function Home() {
  return (
    <main>
      <Head />
      <POICardList></POICardList>
    </main>
  );
}
