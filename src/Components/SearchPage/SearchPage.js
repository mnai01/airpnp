import React, { useState } from "react";

import Search from "../Search/Search";
import Results from "../Results//Results";
import MapContainer from "../MapContainer/MapContainer";
import Spinner from "../Spinner/Spinner";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import Aux from "../../hoc/auxHOC/auxHOC";

import classes from "./SearchPage.module.css";

// const [bathrooms, setBathrooms] = useState([]);
// const [activeMarker, setActiveMarker] = useState(null);
// const [lng, setLng] = useState(0.0);
// const [lat, setLat] = useState(0.0);

const SearchPage = props => {
  const [state, setState] = useState({
    privateResults: [],
    results: [],
    currentLat: props.top1.lat,
    currentLng: props.top1.lng,
    markerPopup: null,
    zoom: 5,
    loading: false
  });

  const handleLoad = TorF => {
    setState(prevState => {
      return { ...prevState, loading: TorF };
    });
  };

  const handleCord = (lat, lng) => {
    setState(prevState => {
      return { ...prevState, currentLat: lat, currentLng: lng };
    });
  };

  const handleBath = bathrooms => {
    setState(prevState => {
      return { ...prevState, results: bathrooms };
    });
  };

  const handlePrivBath = bathrooms => {
    setState(prevState => {
      return { ...prevState, privateResults: bathrooms };
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
    <Aux>
      <div className={classes.container}>
        <div>
          <PlacesAutocomplete
            changePrivBath={handlePrivBath}
            changeBath={handleBath}
            changeLoad={handleLoad}
            state={state}
            changeCord={handleCord}
          ></PlacesAutocomplete>
          <div className={classes.ResultsWrapper}>
            {state.loading ? (
              <Spinner />
            ) : (
              <Results results={state.results}></Results>
            )}
          </div>
        </div>
        <MapContainer
          className={classes.MapContainer}
          state={state}
          dragUpdate={handleDrag}
          marker={handleMarker}
        />
      </div>
    </Aux>
  );
};

export default SearchPage;
