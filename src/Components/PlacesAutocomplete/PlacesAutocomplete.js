import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Cookies from "js-cookie";
import axios from "axios";

import classes from "./PlacesAutocomplete.module.css";

const publicBathroomURL =
  "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";

const privateBathroomURL =
  "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/User/Addresses/API/bycoords/";

const Autocomplete = (props) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latlng);
    props.changeCord(latlng.lat, latlng.lng);
    console.log("lat: " + latlng.lat + " " + "lng: " + latlng.lng);
  };

  // useEffect(() => {
  //   console.log("[useEffect 1] Called");
  //   props.changeCord(coordinates.lat, coordinates.lng);
  // }, []);

  useEffect(() => {
    console.log("[useEffect 2] Called");
    console.log(
      publicBathroomURL +
        "&lat=" +
        props.state.currentLat +
        "&lng=" +
        props.state.currentLng
    );

    console.table(
      privateBathroomURL + props.state.currentLat + "/" + props.state.currentLng
    );
    props.changeLoad(true);
    axios
      .get(
        publicBathroomURL +
          "&lat=" +
          props.state.currentLat +
          "&lng=" +
          props.state.currentLng
      )
      .then((data) => {
        props.changeLoad(false);
        let newResults = data.data;
        props.changeBath(newResults);
      })
      .catch((err) => {
        console.log(err);
      });
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      config.headers[
        "Authorization"
      ] = `Token ${"e44b667a61a43bcecb2c73eb4ef59c924ec71163"}`;
      console.log(true);
    }

    axios
      .get(
        privateBathroomURL +
          props.state.currentLat +
          "/" +
          props.state.currentLng
      )
      .then((data) => {
        console.log(data);
        props.changeLoad(false);
        let newResults = data.data;
        if (newResults.length != 0) {
          props.changePrivBath(newResults);
          console.log("Updated state with" + newResults);
        }
      })
      .catch((err) => {
        console.log("IN Catch ");

        console.log(err);
      });

    // I changed useEffect to run when bathrooms changes. What I have here is
    // bathrooms gets logged after whenever bathrooms changed.
  }, [props.state.currentLng]);

  return (
    <div className={classes.searchBox_wrap}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.searchBox}>
            <p>Lat:{coordinates.lat}</p>
            <p>lng:{coordinates.lng}</p>

            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>{loading ? <div>...loading</div> : null}</div>
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
              };
              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                  {console.log(suggestion)}
                </div>
              );
            })}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Autocomplete;
