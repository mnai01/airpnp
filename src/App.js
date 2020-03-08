import React from "react";
import classes from "./App.module.css";
import SearchPage from "./Components/SearchPage/SearchPage";
import Search from "./Components/Search/Search";
import Results from "./Components/Results//Results";
import MapContainer from "./Components/MapContainer/MapContainer";
import Spinner from "./Components/Spinner/Spinner";
import MainMenuMap from "./Components/MainMenuMap/MainMenuMap";
import Content from "./Content";

function App() {
  return (
    <div className={classes.App}>
      <Content></Content>
    </div>
  );
}

export default App;
