"use client";

import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import "./AudioControls.css";

const AudioControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [duration, setDuration] = useState(0); // in seconds

  const sound = new Howl({
    src: ["/path/to/your/audio.mp3"], // Replace with the actual audio file path
    html5: true,
    onplay: () => {
      setDuration(sound.duration());
      const interval = setInterval(() => {
        setCurrentTime(sound.seek() as number);
      }, 1000);

      return () => clearInterval(interval);
    },
    onend: () => {
      setIsPlaying(false);
    },
  });

  const togglePlayPause = () => {
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFastForward = () => {
    const newTime = Math.min((sound.seek() as number) + 10, duration);
    sound.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleRewind = () => {
    const newTime = Math.max((sound.seek() as number) - 10, 0);
    sound.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    sound.seek(newTime);
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="audio-controls">
      <div className="progress-bar-container">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressBarChange}
          className="progress-bar"
        />
      </div>
      <div className="volume-control">
        <span className="icon">🔊</span>
      </div>
      <div className="control-buttons">
        <button onClick={handleRewind} className="button rewind">
          <span className="icon">❮❮</span>
        </button>
        <button onClick={togglePlayPause} className="button play-pause">
          {isPlaying ? <span className="icon">❚❚</span> : <span className="icon">►</span>}
        </button>
        <button onClick={handleFastForward} className="button fast-forward">
          <span className="icon">❯❯</span>
        </button>
      </div>
      <div className="time-display">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default AudioControls;
