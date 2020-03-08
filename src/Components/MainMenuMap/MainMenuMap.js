import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as bathroomData from "../../assets/public_toilet.json";
import MarkerClusterGroup from "react-leaflet-markercluster";

import classes from "./MapContainer.module.css";

const MainMenuMap = props => {
  return (
    <Map
      className={classes.leaflet_container}
      center={[37.0902, -95.7129]}
      maxZoom={18}
      zoom={5}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup maxClusterRadius={100} spiderfyOnMaxZoom={false}>
        {bathroomData.data.map(result => (
          <Marker
            key={result.id}
            position={[result.latitude, result.longitude]}
            onClick={() => {
              props.marker(result);
            }}
          />
        ))}
        {/* {props.state.markerPopup && (
          <Popup
            position={[
              props.state.markerPopup.latitude,
              props.state.markerPopup.longitude
            ]}
            onClose={() => {
              props.marker(null);
            }}
          >
            <div>
              <h2>{props.state.markerPopup.title}</h2>
              <p>{props.state.markerPopup.extra_info}</p>
            </div>
          </Popup>
        )} */}
      </MarkerClusterGroup>
      );
    </Map>
  );
};
export default MainMenuMap;
