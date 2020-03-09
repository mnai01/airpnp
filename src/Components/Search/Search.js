import React, { useEffect, useState } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import classes from "./Search.module.css";

const publicBathroomURL =
  "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";
const searchLocationURL =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=";

const Search = props => {
  const [place, setState] = useState([]);
  const [latlng, setLatLng] = useState({
    lat: 0,
    lng: 0
  });
  const [searchTF, setSearchTF] = useState(false);
  const [selected, setSelected] = useState();
  const GetResults = e => {
    return (
      <ul>
        {searchTF &&
          e.map(place => {
            return (
              <li
                key={place.formatted_address}
                onClick={() =>
                  props.changeCord(
                    place.geometry.location.lng,
                    place.geometry.location.lat
                  )
                }
              >
                {place.formatted_address}
              </li>
            );
          })}
      </ul>
    );
  };

  const fetchData = e => {
    console.log(e.target.value);
    setSearchTF(true);
    let value = e.target.value;
    setSelected(value);
    let Lat = 0;
    let Lng = 0;
    Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`);
    //returns twice, idk why
    Geocode.fromAddress(value).then(
      response => {
        console.log(response.results);
        let total = response.results;
        setState(total);
        total.map(results => {
          const { lat, lng } = results.geometry.location;
          // MIGHT NOT NEED STATE HERE
          // This is here because I cant get Lat and Lng to hold the values
          // of lat, lng (in the line above) SO i need to set it to a state
          setLatLng({ lat: lat, lng: lng });
          console.log(latlng);
        });
      },
      error => {
        console.error(error);
      }
    );
    if (e.key === "Enter") {
      props.changeCord(latlng.lng, latlng.lat);
      setSearchTF(false);
    }
    if (e.key === "Backspace") {
      setSearchTF(false);
    }
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
    <div className={classes.searchBox_wrap}>
      <input
        className={classes.searchBox}
        type="text"
        placeholder="Enter Zip Code"
        onKeyUp={fetchData}
      />
      {GetResults(place)}
    </div>
  );
};

export default Search;
