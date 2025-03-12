"use client";
import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import "./AudioControls.css";

interface AudioPlayerProps {
  audioURL: string;
  name: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioURL, name }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (audioURL) {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      soundRef.current = new Howl({
        src: [audioURL],
        html5: true,
        onload: () => {
          setDuration(soundRef.current?.duration() || 0);
        },
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

  const togglePlayPause = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
        setIsPlaying(false);
      } else {
        soundRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const skipForward = () => {
    if (soundRef.current) {
      const newTime = Math.min((soundRef.current.seek() as number) + 5, duration);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (soundRef.current) {
      const newTime = Math.max((soundRef.current.seek() as number) - 5, 0);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying && soundRef.current) {
      intervalId = setInterval(() => {
        const currentTime = soundRef.current?.seek() as number;
        setCurrentTime(currentTime);
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, duration]);

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (soundRef.current) {
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
      setProgress((newTime / duration) * 100);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
        <button onClick={skipBackward} className="button-rewind">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
                  <path d="M8.17725 5.13431L0.751738 9.42143L0.751739 0.847194L8.17725 5.13431Z" fill="#F6F6F6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                  <rect x="0.211426" y="0.834656" width="2.01691" height="8.87439" fill="#876950" />
                  <rect x="4.24524" y="0.834656" width="2.01691" height="8.87439" fill="#876950" />
                </svg>
              )}
            </span>
          </button>
        </div>
        <button onClick={skipForward} className="button-fast-forward">
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

export default AudioPlayer;
