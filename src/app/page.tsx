import Navbar from "@/components/Navbar";
import Selected_POI_Page from "@/components/Selected_POI_Page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1> <Selected_POI_Page></Selected_POI_Page>
    </main>
  );
}
