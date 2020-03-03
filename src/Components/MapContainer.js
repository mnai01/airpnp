import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import classes from "./MapContainer.module.css";

const MapContainer = props => {
  return (
    <Map
      className={classes.leaflet_container}
      center={[props.state.currentLat, props.state.currentLng]}
      zoom={props.state.zoom}
      onMoveEnd={props.dragUpdate}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.state.results.map(result => (
        <Marker
          key={result.id}
          position={[result.latitude, result.longitude]}
          onClick={() => {
            props.marker(result);
          }}
        />
      ))}
      {props.state.markerPopup && (
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
            <h2>{props.state.markerPopup.name}</h2>
            <p>{props.state.markerPopup.comment}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapContainer;
