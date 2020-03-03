import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as bathroomData from "./Components/Bathroominfo.json";

import axios from "axios";

function App() {
  const publicBathroomURL =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";
  const searchLocationURL =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=";

  const [state, setState] = useState({
    results: [],
    currentLng: 0.0,
    currentLat: 0.0,
    marker: null,
    zoom: 11
  });

  // const [bathrooms, setBathrooms] = useState([]);
  // const [activeMarker, setActiveMarker] = useState(null);
  // const [lng, setLng] = useState(0.0);
  // const [lat, setLat] = useState(0.0);

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
      return { ...prevState, marker: NnotN };
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
        marker: null,
        zoom: event.target._zoom
      };
    });
  };

  return (
    <div className={classes.App}>
      {/* Put change={handleinput} below if you want the handleinput functiion to work*/}
      <Search
        state={state}
        changeCord={handleCord}
        changeBath={handleBath}
        changeMarker={handleMarker}
      ></Search>{" "}
      <Map
        className={classes.leaflet_container}
        center={[state.currentLat, state.currentLng]}
        zoom={state.zoom}
        onMoveEnd={handleDrag}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {state.results.map(result => (
          <Marker
            key={result.id}
            position={[result.latitude, result.longitude]}
            onClick={() => {
              handleMarker(result);
            }}
          />
        ))}
        {state.marker && (
          <Popup
            position={[state.marker.latitude, state.marker.longitude]}
            onClose={() => {
              handleMarker(null);
            }}
          >
            <div>
              <h2>{state.marker.name}</h2>
              <p>{state.marker.comment}</p>
            </div>
          </Popup>
        )}
      </Map>
      <Results results={state.results}></Results>
    </div>
  );
}

export default App;
