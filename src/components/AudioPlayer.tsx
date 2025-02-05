import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

interface AudioPlayerProps {
  audioURL: string;
  name: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioURL, name }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const soundRef = useRef<Howl | null>(null);

  // Howl instance creation/update on audioURL change
  useEffect(() => {
    if (audioURL) {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      soundRef.current = new Howl({
        src: [audioURL],
        html5: true,
        onend: () => {
          setIsPlaying(false);
          setProgress(0);
        },
      });
    }
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [audioURL]);

  // To handle playing the audio
  const handlePlay = () => {
    if (soundRef.current) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  // To handle pausing the audio.
  const handlePause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Attempt to update progress bar
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying && soundRef.current) {
      intervalId = setInterval(() => {
        if (!soundRef.current) return;
        const currentTime = soundRef.current.seek() as number;
        const duration = soundRef.current.duration();
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="audio-player">
      <h3>{name}</h3>
      <div>
        <button onClick={handlePlay} disabled={isPlaying}>
          Play
        </button>
        <button onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
      </div>
      <div>
        <progress value={progress} max="100" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default AudioPlayer;
