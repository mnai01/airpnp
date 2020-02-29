import React, { useEffect } from "react";
import axios from "axios";

import "./Search.css";
const Search = props => {
  const publicBathroomURL =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";
  const searchLocationURL =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=";
  let i = 0;
  const search = e => {
    let value = e.target.value;
    if (e.key === "Enter") {
      props.changeMarker(null);
      console.log(value);
      axios.get(searchLocationURL + value).then(res => {
        let newResults = res.data.records;
        newResults.map(results => {
          if (value === results.fields.city || value === results.fields.zip) {
            let lat = results.fields.latitude;
            let lng = results.fields.longitude;
            props.changeCord(lng, lat);
            // setLat(results.fields.latitude);
            // setLng(results.fields.longitude);
            console.log(results.fields.city);
            console.log(
              results.fields.longitude + " " + results.fields.latitude
            );
          }
        });
      });
    }
    // if (e.key === "Enter") {
    //   console.log(lat, lng);

    // axios
    //   .get(publicBathroomURL + "&lat=" + lat + "&lng=" + lng)
    //   .then(data => {
    //     let newResults = data.data;
    //     console.log(newResults);
    //     setBathrooms(newResults);
    //     console.log(
    //       "URL CALLED: " + publicBathroomURL + "&lat=" + lat + "&lng=" + lng
    //     );
    //     console.log("DATA BEING CAUGHT " + newResults);
    //     console.log("STATE BEING SHOWN " + bathrooms);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    //}
  };

  useEffect(() => {
    axios
      .get(
        publicBathroomURL +
          "&lat=" +
          props.state.currentLat +
          "&lng=" +
          props.state.currentLng
      )
      .then(data => {
        let newResults = data.data;
        console.log(newResults);
        props.changeBath(newResults);
        console.log(
          "URL CALLED: " +
            publicBathroomURL +
            "&lat=" +
            props.state.currentLat +
            "&lng=" +
            props.state.currentLng
        );
      })
      .catch(err => {
        console.log(err);
      });
    // I changed useEffect to run when bathrooms changes. What I have here is
    // bathrooms gets logged after whenever bathrooms changed.
  }, [props.state.currentLng]);
  return (
    <div className="searchBox-wrap">
      <input
        className="searchBox"
        type="text"
        placeholder="Enter Zip Code"
        className="searchBox"
        onKeyPress={search}
      ></input>
    </div>
  );
};

export default Search;
