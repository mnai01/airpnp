import React from "react";
import Geocode from "react-geocode";

const GeocodeSearch = props => {
  let cord = "";
  Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`);

  //returns twice, idk why
  Geocode.fromAddress("New York").then(
    response => {
      console.log(response.results);
      let total = response.results;
      total.map(results => {
        const { lat, lng } = results.geometry.location;
        console.log(lat);
        console.log(lng);
      });
    },
    error => {
      console.error(error);
    }
  );
  return (
    <input
      className={classes.searchBox}
      type="text"
      placeholder="Enter Zip Code"
      onKeyPress={fetchData}
    ></input>
  );
};

export default GeocodeSearch;
