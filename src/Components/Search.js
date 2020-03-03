import React, { useEffect } from "react";
import axios from "axios";
import classes from "./Search.module.css";

const publicBathroomURL =
  "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";
const searchLocationURL =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=";

const Search = props => {
  const fetchData = e => {
    let value = e.target.value;
    if (e.key === "Enter") {
      props.changeMarker(null);
      axios.get(searchLocationURL + value).then(res => {
        let newResults = res.data.records;
        newResults.map(results => {
          if (value === results.fields.city || value === results.fields.zip) {
            let lat = results.fields.latitude;
            let lng = results.fields.longitude;
            props.changeCord(lng, lat);
            // I dont know if this needs to be here? but it fixes the array-callback-return warning
            return true;
          }
          // I dont know if this needs to be here? but it fixes the array-callback-return warning
          return false;
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
        onKeyPress={fetchData}
      ></input>
    </div>
  );
};

export default Search;
