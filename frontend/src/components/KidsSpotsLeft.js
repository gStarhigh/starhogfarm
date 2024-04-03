// React
import React, { useState, useEffect } from "react";
import axios from "axios";

// Imports
import Loader from "./Spinner";

const KidsSpotsLeft = () => {
  const [remainingSpots, setRemainingSpots] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemainingSpots = async () => {
      try {
        const response = await axios.get("/available_spots_kids/");
        setRemainingSpots(response.data.available_spots_kids);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching remaining spots:", error);
      }
    };

    fetchRemainingSpots();
  }, []);

  return (
    <>
      {loading && <Loader />}
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

export default KidsSpotsLeft;
