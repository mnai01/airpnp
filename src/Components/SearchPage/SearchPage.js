import React, { useState } from "react";
import Search from "../Search/Search";
import Results from "../Results//Results";
import MapContainer from "../MapContainer/MapContainer";
import Spinner from "../Spinner/Spinner";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import Modal from "../Modal/Modal";

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
    currentLat: props.cords.lat,
    currentLng: props.cords.lng,
    markerPopup: null,
    zoom: props.zoom,
    loading: false
  });
  const [currentSelected, setSelected] = useState([]);
  const [ModalChange, setModal] = useState(false);

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

  const handleResultClicked = key => {
    setModal(!ModalChange);
    const personIndex = state.results.findIndex(i => {
      return i.id === key;
    });
    setSelected(state.results[personIndex]);
    console.log(state.results[personIndex]);
  };

  const handleResultClickedFalse = key => {
    setModal(false);
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
            <Results
              results={state.results}
              click={handleResultClicked}
            ></Results>
          )}
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
