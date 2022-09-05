import React from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  songs,
  setCurrentSong,
  setIsPlaying,
  setSongs,
  libraryToggle,
}) => {
  return (
    <div className={`library ${libraryToggle ? "active-library" : ""}`}>
      <h2>
        Tracks <span> </span>
        <FontAwesomeIcon icon={faHeadphones} />
      </h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setCurrentSong={setCurrentSong}
            setIsPlaying={setIsPlaying}
            songs={songs}
            song={song}
            id={song.id}
            key={song.id}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
