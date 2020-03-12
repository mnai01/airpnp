import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import axios from "axios";

const publicBathroomURL =
  "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";

const Autocomplete = props => {
  const [address, setAddress] = useState();
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latlng);
    props.changeCord(latlng.lat, latlng.lng);
    console.log(latlng.lat + " " + latlng.lng);
  };

  useEffect(() => {
    props.changeLoad(true);

    axios
      .get(
        publicBathroomURL +
          "&lat=" +
          props.state.currentLat +
          "&lng=" +
          props.state.currentLng
      )
      .then(data => {
        props.changeLoad(false);
        let newResults = data.data;
        props.changeBath(newResults);
      })
      .catch(err => {
        console.log(err);
      });
    // I changed useEffect to run when bathrooms changes. What I have here is
    // bathrooms gets logged after whenever bathrooms changed.
  }, [props.state.currentLng]);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <p>Lat:{coordinates.lat}</p>
          <p>lng:{coordinates.lng}</p>

          <input {...getInputProps({ placeholder: "Type address" })} />
          <div>{loading ? <div>...loading</div> : null}</div>
          {suggestions.map(suggestion => {
            const style = {
              backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
            };
            return (
              <div {...getSuggestionItemProps(suggestion, { style })}>
                {suggestion.description}
              </div>
            );
          })}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default Autocomplete;
