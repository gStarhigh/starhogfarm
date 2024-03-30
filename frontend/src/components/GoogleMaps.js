import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "../styles/AboutPage.module.css";

const AnyReactComponent = () => (
  <div className={styles.MapPin}>
    <i className="fas fa-map-marker-alt"></i>
  </div>
);

export default function Map() {
  const defaultProps = {
    center: {
      lat: 56.20593888061705,
      lng: 13.0081107977851,
    },
    zoom: 9,
  };

  return (
    <div className={styles.Map}>
      <GoogleMapReact
        bootstrapURLKeys={{ apiKey: "AIzaSyA-i-CYlD0YKj09JhhUTucal3dzQsGRUV4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={56.20593888061705} lng={13.0081107977851} />
      </GoogleMapReact>
    </div>
  );
}
