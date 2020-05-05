import React, { useState } from "react";
import Search from "../Search/Search";
import Results from "../Results/Results";
import PrivateResults from "../PrivateResults/PrivateResults";
import MapContainer from "../MapContainer/MapContainer";
import Spinner from "../Spinner/Spinner";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import Modal from "../Modal/Modal";
import * as GeoLocation from "../GeoLocation/GeoLocation";
import { Button, Form, FormGroup } from "reactstrap";

import Aux from "../../hoc/auxHOC/auxHOC";
import classes from "./SearchPage.module.css";

// const [bathrooms, setBathrooms] = useState([]);
// const [activeMarker, setActiveMarker] = useState(null);
// const [lng, setLng] = useState(0.0);
// const [lat, setLat] = useState(0.0);

const SearchPage = (props) => {
  const [state, setState] = useState({
    privateResults: [],
    results: [],
    currentLat: props.cords.lat,
    currentLng: props.cords.lng,
    markerPopup: null,
    zoom: props.zoom,
    loading: false,
  });
  const [currentSelected, setSelected] = useState([]);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(true);
  const [ModalChange, setModal] = useState(false);
  const [myLocation, setMylocation] = useState({ latitude: 0, longitude: 0 });

  const handleLoad = (TorF) => {
    setState((prevState) => {
      return { ...prevState, loading: TorF };
    });
  };

  const handleCord = (lat, lng) => {
    setState((prevState) => {
      return { ...prevState, currentLat: lat, currentLng: lng };
    });
  };

  const handleBath = (bathrooms) => {
    setState((prevState) => {
      return { ...prevState, results: bathrooms };
    });
  };

  const handlePrivBath = (bathrooms) => {
    setState((prevState) => {
      return { ...prevState, privateResults: bathrooms };
    });
  };

  const handleMarker = (NnotN) => {
    setState((prevState) => {
      return { ...prevState, markerPopup: NnotN };
    });
  };

  const handleDrag = (event) => {
    let str = event.target.getCenter();
    console.log(str.lat, str.lng, event.target._zoom);
    setState((prevState) => {
      return {
        ...prevState,
        currentLng: parseFloat(str.lng.toFixed(4)),
        currentLat: parseFloat(str.lat.toFixed(4)),
        markerPopup: null,
        zoom: event.target._zoom,
      };
    });
  };

  const handleResultClicked = (key) => {
    setModal(!ModalChange);
    const bathroomIndex = state.results.findIndex((i) => {
      return i.id === key;
    });
    setSelected(state.results[bathroomIndex]);
    console.log(state.results[bathroomIndex]);
  };

  const handlePrivateResultClicked = (key) => {
    const bathroomIndex = state.privateResults.findIndex((i) => {
      return i.id === key;
    });
    props.handle(state.privateResults[bathroomIndex]);
    console.log(state.privateResults[bathroomIndex]);
  };

  const handleResultClickedFalse = (key) => {
    setModal(false);
  };

  let currentLocation = GeoLocation.usePosition();
  const handleGetLocation = () => {
    if (currentLocation.latitude || currentLocation.longitude !== undefined) {
      setMylocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
      setCurrentLocationLoading(false);
      handleCord(currentLocation.latitude, currentLocation.longitude);
    }
  };

  return (
    <Aux>
      <Modal changeModalFalse={handleResultClickedFalse} show={ModalChange}>
        <h3>{currentSelected.name}</h3>
        <p>
          {currentSelected.street},{currentSelected.city},
          {currentSelected.state}
        </p>
        <p>{currentSelected.comment}</p>
        <p>Upvotes: {currentSelected.upvote}</p>
        <p>Downvotes: {currentSelected.downvote}</p>
      </Modal>

      <div className={classes.currentLocation}>
        <Button onClick={handleGetLocation}>Press to find your location</Button>
      </div>

      <PlacesAutocomplete
        changePrivBath={handlePrivBath}
        changeBath={handleBath}
        changeLoad={handleLoad}
        state={state}
        changeCord={handleCord}
      ></PlacesAutocomplete>
      <div className={classes.container}>
        <div className={classes.ResultsWrapper}>
          {state.loading ? (
            <Spinner />
          ) : (
            <div className={classes.results}>
              <PrivateResults
                privResults={state.privateResults}
                click={handlePrivateResultClicked}
              />
              <Results
                results={state.results}
                click={handleResultClicked}
              ></Results>
            </div>
          )}
        </div>
        <MapContainer
          loading={currentLocationLoading}
          current_location={myLocation}
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
