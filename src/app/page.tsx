import Navbar from "@/components/Navbar";
import POICard from "@/components/poiList";
export default function Home() {
  return (
    <main>
      <Navbar />
      <POICard
        title="Test"
        duration="19:00"
        imageUrl="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </main>
  );
}
