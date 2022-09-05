import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    const playPromise = audioRef.current[isPlaying ? "play" : "pause"]();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log(error);
      });
    }
  }, [isPlaying, currentSong]);

  const playSongHandler = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const trackHandler = async (direction) => {
    let songIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(
        songs[songIndex + 1 === songs.length ? 0 : songIndex + 1]
      );
    }
    if (direction === "skip-back") {
      await setCurrentSong(
        songs[songIndex === 0 ? songs.length - 1 : songIndex - 1]
      );
    }
  };

  const songEndHandler = async () => {
    let songIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(
      songs[songIndex + 1 === songs.length ? 0 : songIndex + 1]
    );
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${animationPercentage}%)`,
            }}
          ></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => trackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          onClick={() => trackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
