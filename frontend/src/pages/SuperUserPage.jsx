// React
import React, { useState, useEffect } from "react";

// React Bootstrap Imports
import Button from "react-bootstrap/Button";

// Imports
import axios from "axios";
import Loader from "../components/Spinner";

import styles from "../styles/SuperUserPage.module.css";

const SuperUserPage = () => {
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adultEventBookings, setAdultEventBookings] = useState([]);
  const [kidsEventBookings, setKidsEventBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/get_current_user")
      .then((response) => {
        setIsSuperUser(response.data.is_superuser);
        setIsLoading(false); // Indikera att data har hämtats
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/bookings/")
      .then((response) => {
        setAdultEventBookings(response.data.adult_events);
        console.log(adultEventBookings);
        setKidsEventBookings(response.data.kids_events);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event bookings:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuperUser) {
    return (
      <div className="text-center mt-4">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <Button href="/">Go home</Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1>Bokningar</h1>
      <div className={styles.eventBookings}>
        <div className={styles.adultEventBookings}>
          <h4>Vuxen evenemang:</h4>
          <ul>
            {adultEventBookings.map((booking) => (
              <li key={booking.booking_id} className={styles.bookingItem}>
                <span className={styles.bookingInfo}>{booking.full_name}</span>
                <span className={styles.bookingInfo}>
                  {booking.competition_level}
                </span>
                <span className={styles.bookingInfo}>
                  Boxplats: {booking.wants_box_spot ? "Ja" : "Nej"}
                </span>
                <span className={styles.bookingInfo}>
                  {booking.phone_number}
                </span>
                <span className={styles.bookingInfo}>
                  {booking.deposit_paid ? "Deposit paid" : "Deposit not paid"}
                </span>
                <span className={styles.bookingInfo}>
                  {booking.booking_status === 1 ? "Bekräftad" : "Obekräftad"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.kidsEventBookings}>
          <h4>Ungdoms evenemang:</h4>
          <ul>
            {kidsEventBookings.length > 0 ? (
              kidsEventBookings.map((booking) => (
                <li key={booking.booking_id}>
                  {booking.full_name} - {booking.booking_status}
                </li>
              ))
            ) : (
              <p>Inga bokningar ännu</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperUserPage;
