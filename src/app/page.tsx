import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1> {/* sample audio formatting */}
      <AudioPlayer audioURL="https://www.example.com/sample-audio.mp3" name="Sample Audio" />
    </main>
  );
  s;
}
