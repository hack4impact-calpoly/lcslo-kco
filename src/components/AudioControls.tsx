"use client";

import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import "./AudioControls.css";
import "@/components/AudioPlayer";

interface AudioControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  soundRef: React.MutableRefObject<Howl | null>;
}

const AudioControls: React.FC<AudioControlsProps> = ({ isPlaying, togglePlayPause, soundRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const sound = soundRef.current;
    if (!sound) return;
    setDuration(sound.duration());

    const interval = window.setInterval(() => {
      setCurrentTime(sound.seek() as number);
    }, 1000);

    return () => clearInterval(interval);
  }, [soundRef, isPlaying]);

  const handleFastForward = () => {
    const sound = soundRef.current;
    if (!sound) return;
    const newTime = Math.min((sound.seek() as number) + 10, duration);
    sound.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleRewind = () => {
    const sound = soundRef.current;
    if (!sound) return;
    const newTime = Math.max((sound.seek() as number) - 10, 0);
    sound.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sound = soundRef.current;
    if (!sound) return;
    const newTime = parseFloat(e.target.value);
    sound.seek(newTime);
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="audio-controls">
      {/* Progress Bar and Time Display */}
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
      <div className="time-display">
        {formatTime(currentTime)}/{formatTime(duration)}
      </div>

      {/* Control Buttons */}
      <div className="control-buttons">
        <span className="icon">
          <svg
            className="volume-control"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M6.05041 0V1.11434C7.64002 1.57956 8.8006 3.02928 8.8006 4.74407C8.8006 6.45887 7.64002 7.90319 6.05041 8.3684V9.48815C8.25056 8.99589 9.90068 7.05931 9.90068 4.74407C9.90068 2.42884 8.25056 0.492259 6.05041 0ZM7.42551 4.74407C7.42551 3.7866 6.87547 2.96437 6.05041 2.56407V6.90785C6.87547 6.52378 7.42551 5.69614 7.42551 4.74407ZM0 3.12124V6.36691H2.20015L4.95034 9.07162V0.416526L2.20015 3.12124H0Z"
              fill="white"
            />
          </svg>
        </span>
        <button onClick={handleRewind} className="button-rewind">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
              <rect width="1.51674" height="9.10043" transform="matrix(-1 0 0 1 2.32031 0.821747)" fill="#D9D9D9" />
              <path d="M2.82587 5.37196L9.65119 9.31257L9.65119 1.43136L2.82587 5.37196Z" fill="#D9D9D9" />
            </svg>
          </span>
        </button>
        <div className="play-button">
          <button onClick={togglePlayPause} className="button-play-pause">
            <span className="play">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                  <rect x="0.211426" y="0.834656" width="2.01691" height="8.87439" fill="#876950" />
                  <rect x="4.24524" y="0.834656" width="2.01691" height="8.87439" fill="#876950" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
                  <path d="M8.17725 5.13431L0.751738 9.42143L0.751739 0.847194L8.17725 5.13431Z" fill="#F6F6F6" />
                </svg>
              )}
            </span>
          </button>
        </div>
        <button onClick={handleFastForward} className="button-fast-forward">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
              <rect x="10.1531" y="0.821747" width="1.51674" height="9.10043" fill="#D9D9D9" />
              <path d="M9.64758 5.37196L2.82226 9.31257L2.82226 1.43136L9.64758 5.37196Z" fill="#D9D9D9" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AudioControls;
