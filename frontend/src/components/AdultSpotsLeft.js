import React, { useState, useEffect } from "react";
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
        ? remainingSpots === 0
          ? "Tyvärr är alla boxplatser fulla, men det går fortfarande bra att boka medverkan på evenemanget."
          : `Antal lediga boxplatser kvar: ${remainingSpots}st`
        : "Antal lediga boxplatser kvar: 5st"}
    </p>
  );
};

export default AdultSpotsLeft;
