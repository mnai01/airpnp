import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import L from "leaflet";
import Toilet from "../../assets/Toiletv1.png";
import ToiletShadow from "../../assets/Toilet-Shadow.png";
import classes from "./MapContainer.module.css";
import "./MapContainer.css";

import { popupContent, popupHead, popupText, okText } from "./popupStyles";

const MapContainer = (props) => {
  var toiletIcon = L.icon({
    iconUrl: Toilet,
    shadowUrl: ToiletShadow,
    iconSize: [50, 80], // size of the icon
    shadowSize: [50, 75], // size of the shadow
    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [23, 40], // the same for the shadow
    popupAnchor: [0, -30],
  });

  return (
    <Map
      className={classes.leaflet_container}
      center={[props.state.currentLat, props.state.currentLng]}
      zoom={props.state.zoom}
      onMoveEnd={props.dragUpdate}
      maxZoom={19}
    >
      {/* https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png */}
      {/* new map link just copy and paste Reference https://leaflet-extras.github.io/leaflet-providers/preview/ */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.state.privateResults.map((result) => (
        <Marker
          // icon={toiletIcon}
          key={result.id}
          position={[result.address_id.latitude, result.address_id.longitude]}
        />
      ))}

      {props.state.results.map((result) => (
        <Marker
          icon={toiletIcon}
          key={result.id}
          position={[result.latitude, result.longitude]}
          onClick={() => {
            props.marker(result);
          }}
        />
      ))}
      {props.state.markerPopup && (
        <Popup
          className="custom-popup"
          position={[
            props.state.markerPopup.latitude,
            props.state.markerPopup.longitude,
          ]}
          onClose={() => {
            props.marker(null);
          }}
        >
          <div>
            <h2>{props.state.markerPopup.name}</h2>
            <div className="info-container">
              <p className="address">
                {props.state.markerPopup.street},{props.state.markerPopup.city},
                {props.state.markerPopup.state}
              </p>
              <p className="comment">{props.state.markerPopup.comment}</p>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapContainer;
