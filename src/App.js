import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as bathroomData from "./Components/Bathroominfo.json";

import axios from "axios";

function App() {
  const publicBathroomURL =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0&ada=false&unisex=false";
  const searchLocationURL =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=";

  // const [state, setState] = useState({
  // results: [],
  // currentLng: 0.0,
  // currentLat: 0.0
  // });

  const [bathrooms, setBathrooms] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [lng, setLng] = useState(0.0);
  const [lat, setLat] = useState(0.0);

  // const handleinput = e => {
  //   if (e.target.value === "New York") {
  //     setLat(40.7128);
  //     setLng(-74.006);
  //   }
  //   if (e.target.value === "Chicago") {
  //     setLat(41.8781);
  //     setLng(-87.6298);
  //   }
  // };

  const search = e => {
    let value = e.target.value;
    console.log(e.target.value.length);
    console.log(bathrooms);

    if (e.key === "Enter") {
      setActiveMarker(null);
      console.log(value);
      axios.get(searchLocationURL + value).then(res => {
        let newResults = res.data.records;
        newResults.map(results => {
          if (value === results.fields.city || value === results.fields.zip) {
            setLat(results.fields.latitude);
            setLng(results.fields.longitude);
            console.log(results.fields.city);
            console.log(
              results.fields.longitude + " " + results.fields.latitude
            );
          }
        });
      });
    }
    if (e.key === "Enter") {
      console.log(lat, lng);

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
    }
  };

  useEffect(() => {
    axios
      .get(publicBathroomURL + "&lat=" + lat + "&lng=" + lng)
      .then(data => {
        let newResults = data.data;
        console.log(newResults);
        setBathrooms(newResults);
        console.log(
          "URL CALLED: " + publicBathroomURL + "&lat=" + lat + "&lng=" + lng
        );
        console.log("DATA BEING CAUGHT " + newResults);
        console.log("STATE BEING SHOWN " + bathrooms);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("execute useEffect");
    console.log(bathrooms);
    // I changed useEffect to run when bathrooms changes. What I have here is
    // bathrooms gets logged after whenever bathrooms changed.
  }, [lng]);

  return (
    <div className="App">
      {/* Put change={handleinput} below if you want the handleinput functiion to work*/}
      <Search keypress={search}></Search>
      <Map center={[lat, lng]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {bathrooms.map(result => (
          <Marker
            key={result.id}
            position={[result.latitude, result.longitude]}
            onClick={() => {
              setActiveMarker(result);
            }}
          />
        ))}
        {activeMarker && (
          <Popup
            position={[activeMarker.latitude, activeMarker.longitude]}
            onClose={() => {
              setActiveMarker(null);
            }}
          >
            <div>
              <h2>{activeMarker.name}</h2>
              <p>{activeMarker.comment}</p>
            </div>
          </Popup>
        )}
      </Map>
      <Results results={bathrooms}></Results>
    </div>
  );
}

export default App;
