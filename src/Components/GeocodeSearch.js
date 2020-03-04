import React from "react";
import Geocode from "react-geocode";
const GeocodeSearch = props => {
  const cord = "";
  Geocode.setApiKey("");

  //returns twice, idk why
  Geocode.fromAddress("").then(
    response => {
      console.log(response.results);
      let total = response.results;
      total.map(results => {
        console.log(results.formatted_address);
      });
    },
    error => {
      console.error(error);
    }
  );
  return <p>test</p>;
};

export default GeocodeSearch;
