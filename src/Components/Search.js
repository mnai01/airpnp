import React from "react";
import "./Search.css";
const Search = props => {
  return (
    <div className="searchBox-wrap">
      <input
        className="searchBox"
        type="text"
        placeholder="Enter Zip Code"
        className="searchBox"
        onKeyPress={props.keypress}
      ></input>
    </div>
  );
};

export default Search;
