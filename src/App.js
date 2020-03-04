import React, { useState } from "react";
import classes from "./App.module.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import MapContainer from "./Components/MapContainer";
import Spinner from "./Components/Spinner";
import MainMenuMap from "./Components/MainMenuMap";
import GeocodeSearch from "./Components/GeocodeSearch";

function App() {
  const [state, setState] = useState({
    results: [],
    currentLng: -95.7129,
    currentLat: 37.0902,
    markerPopup: null,
    zoom: 5,
    loading: false
  });

  // const [bathrooms, setBathrooms] = useState([]);
  // const [activeMarker, setActiveMarker] = useState(null);
  // const [lng, setLng] = useState(0.0);
  // const [lat, setLat] = useState(0.0);

  const handleLoad = TorF => {
    setState(prevState => {
      return { ...prevState, loading: TorF };
    });
  };

  const handleCord = (lng, lat) => {
    setState(prevState => {
      return { ...prevState, currentLng: lng, currentLat: lat };
    });
  };

  const handleBath = bathrooms => {
    setState(prevState => {
      return { ...prevState, results: bathrooms };
    });
  };

  const handleMarker = NnotN => {
    setState(prevState => {
      return { ...prevState, markerPopup: NnotN };
    });
  };

  const handleDrag = event => {
    let str = event.target.getCenter();
    console.log(str.lng, event.target._zoom);
    setState(prevState => {
      return {
        ...prevState,
        currentLng: str.lng.toFixed(4),
        currentLat: str.lat.toFixed(4),
        markerPopup: null,
        zoom: event.target._zoom
      };
    });
  };

  return (
    <div className={classes.App}>
      <Search
        state={state}
        changeCord={handleCord}
        changeBath={handleBath}
        changeMarker={handleMarker}
        changeLoad={handleLoad}
      ></Search>
      <MapContainer
        state={state}
        dragUpdate={handleDrag}
        marker={handleMarker}
      />
      {/* <MainMenuMap state={state} marker={handleMarker} /> */}
      {state.loading ? (
        <Spinner />
      ) : (
        <Results results={state.results}></Results>
      )}
    </div>
  );
}

export default App;
