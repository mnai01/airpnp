import React, { useState } from "react";

import Search from "../Search/Search";
import Results from "../Results//Results";
import MapContainer from "../MapContainer/MapContainer";
import Spinner from "../Spinner/Spinner";
import classes from "./SearchPage.module.css";

// const [bathrooms, setBathrooms] = useState([]);
// const [activeMarker, setActiveMarker] = useState(null);
// const [lng, setLng] = useState(0.0);
// const [lat, setLat] = useState(0.0);

const SearchPage = () => {
  const [state, setState] = useState({
    results: [],
    currentLng: -95.7129,
    currentLat: 37.0902,
    markerPopup: null,
    zoom: 5,
    loading: false
  });

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
    console.log(str.lng, str.lat, event.target._zoom);
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
      <div className={classes.container}>
        <div className={classes.spacer}></div>
        {state.loading ? (
          <Spinner className={classes.Spinner} />
        ) : (
          <Results
            className={classes.ResultsWrapper}
            results={state.results}
          ></Results>
        )}
        <MapContainer
          className={classes.MapContainer}
          state={state}
          dragUpdate={handleDrag}
          marker={handleMarker}
        />
      </div>
    </div>
  );
};

export default SearchPage;
