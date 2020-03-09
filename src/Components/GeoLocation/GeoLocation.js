import React, { useState } from "react";
import { GoogleComponent } from "react-google-location";

const GeoLocation = () => {
  const [place, setState] = useState({});

  return (
    <div>
      <GoogleComponent
        apiKey={`${process.env.REACT_APP_API_KEY}`}
        language={"en"}
        country={"country:in|country:us"}
        coordinates={true}
        locationBoxStyle={"custom-style"}
        locationListStyle={"custom-style-list"}
        onChange={e => {
          setState(e);
        }}
      />
    </div>
  );
};

export default GeoLocation;
