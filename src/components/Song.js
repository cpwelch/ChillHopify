import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        src={currentSong.cover}
        alt="Album Cover for playing Artist."
        className={isPlaying ? "rotate" : ""}
        style={{
          boxShadow: `0px 0px 40px .5px ${currentSong.color[0]}`,
        }}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
