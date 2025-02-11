import Navbar from "@/components/Navbar";
import Selected_POI_Page from "@/components/Selected_POI_Page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/*Example Here:*/}
      <Selected_POI_Page
        mainImage="lcslo_placeholder.jpg"
        name="Poi Name"
        content="Lorem ipsum"
        audio_link="link"
        duration_sec={200}
        tour_progress={2}
        total_tours={15}
      />
    </main>
  );
}
