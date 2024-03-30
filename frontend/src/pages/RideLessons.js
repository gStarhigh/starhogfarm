import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "../styles/RideLessons.module.css";

function RideLessons() {
  return (
    <div className={styles.RideLessonsContainer}>
      <h1>Ridlektioner</h1>
      <p>Sidan är under konstruktion</p>
      <p>Mer information kommer inom kort</p>
      <Link to="/" className={styles.HomeButton}>
        Hem
      </Link>
    </div>
  );
}

export default RideLessons;
