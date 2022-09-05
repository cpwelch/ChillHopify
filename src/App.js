import { useState } from "react";
import "./styles/app.scss";

import Player from "./components/Player";
import Nav from "./components/Nav";
import Song from "./components/Song";
import Library from "./components/Library";
import data from "./data";

const App = () => {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryToggle, setLibraryToggle] = useState(false);
  return (
    <div className={`App ${libraryToggle ? "library-active" : ""}`}>
      <Nav libraryToggle={libraryToggle} setLibraryToggle={setLibraryToggle} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        libraryToggle={libraryToggle}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
      />
    </div>
  );
};

export default App;
