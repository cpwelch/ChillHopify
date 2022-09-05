import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryToggle, setLibraryToggle }) => {
  const libraryToggleHandler = ({ style }) => {
    setLibraryToggle(!libraryToggle);
  };

  return (
    <nav>
      <h1>
        chill<span className="h1-end">Hopify</span>
      </h1>
      <button onClick={libraryToggleHandler}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
