import React, { useState, useEffect } from "react";
import axios from "axios";

const AdultSpotsLeft = () => {
  const [remainingSpots, setRemainingSpots] = useState(null);

  useEffect(() => {
    const fetchRemainingSpots = async () => {
      try {
        const response = await axios.get("/available_spots_adult/");
        console.log("Response data:", response.data);
        setRemainingSpots(response.data.available_spots_adult);
      } catch (error) {
        console.error("Error fetching remaining spots:", error);
      }
    };

    fetchRemainingSpots();
  }, []);

  return (
    <>
      {remainingSpots !== null && (
        <p>
          {remainingSpots === 0
            ? "Tyvärr är alla boxplatser fulla, men det går fortfarande bra att boka medverkan på evenemanget."
            : `Antal lediga boxplatser kvar: ${remainingSpots}st`}
        </p>
      )}
    </>
  );
};

export default AdultSpotsLeft;
