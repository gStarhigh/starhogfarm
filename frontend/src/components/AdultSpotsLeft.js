import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import axios from "axios";

const AdultSpotsLeft = () => {
  const [remainingSpots, setRemainingSpots] = useState(null);

  useEffect(() => {
    const fetchRemainingSpots = async () => {
      try {
        const response = await axios.get("/available_spots/");
        setRemainingSpots(response.data.available_spots);
      } catch (error) {
        console.error("Error fetching remaining spots:", error);
      }
    };

    fetchRemainingSpots();
  }, []);

  return (
    <p>
      {remainingSpots !== null
        ? `Antal boxplatser kvar: ${remainingSpots}st`
        : "Antal boxplatser kvar: 5st"}
    </p>
  );
};

export default AdultSpotsLeft;
