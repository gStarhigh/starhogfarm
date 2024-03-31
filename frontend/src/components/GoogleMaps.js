import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styles from "../styles/AboutPage.module.css";

const AnyReactComponent = () => (
  <div className={styles.MapPin}>
    <i className="fas fa-map-marker-alt"></i>
  </div>
);

export default function Map() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/google-maps-api-key/");
        if (!response.ok) {
          throw new Error("Failed to fetch API key");
        }
        const data = await response.json();
        setApiKey(data.google_maps_api_key);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Google Maps API key:", error);
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        bootstrapURLKeys={{ apiKey: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={56.20593888061705} lng={13.0081107977851} />
      </GoogleMapReact>
    </div>
  );
}
