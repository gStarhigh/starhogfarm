import React from "react";
import { Link } from "react-router-dom";
// import BookingPage from "./RideLessonsBookingPage";

import { FaPhoneVolume, FaEnvelope } from "react-icons/fa";

// Styles
import styles from "../styles/RideLessons.module.css";

function RideLessons() {
  const emailAddress = "maria@starhoggard.se";
  return (
    <div className={styles.Main}>
      <div className={styles.RideLessonsContainer}>
        <h1>Våra ridlektioner!</h1>
        <p>
          <strong>Sidan är under konstruktion</strong> men du kan fortfarande
          kontakta oss genom mejl eller telefon!
        </p>
        <div className={styles.ContactInfo}>
          <p>
            <FaPhoneVolume /> 0705 57 57 97
          </p>
          <p>
            <a className={styles.Mail} href={`mailto:${emailAddress}`}>
              <FaEnvelope /> maria@starhoggard.se
            </a>
          </p>
        </div>
        <div className={styles.ButtonsContainer}>
          <Link to="/" className={styles.HomeButton}>
            Tillbaka
          </Link>
        </div>
      </div>
    </div>
    // <BookingPage />
  );
}

export default RideLessons;
