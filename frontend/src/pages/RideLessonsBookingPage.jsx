import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/BookingPage.module.css';
import sv from 'date-fns/locale/sv';
import { useHistory } from "react-router-dom";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const history = useHistory();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableTimes(date);
    setSelectedTime('');
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const fetchAvailableTimes = (selectedDate) => {
    const AvailableTimes = [
      { time: '18:00-18:45', info: 'Öppen för alla' },
      { time: '19:00-19:45', info: 'Endast avancerade' },
      { time: '20:00-20:45', info: 'Familjetid' },
      { time: '21:00-21:45', info: 'Privatlektion' }
    ];
    setAvailableTimes(AvailableTimes);
  };

  const handleBooking = () => {
  };

  const cancelBooking = () => {
    history.push("/");
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.calendarContainer}>
          <h2>Välj datum:</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date(new Date().getTime() + 48 * 60 * 60 * 1000)}
            maxDate={null}
            locale={sv}
        />

        </div>
        <div className={styles.availableTimesContainer}>
          <h2>Tillgängliga tider</h2>
          <ul className={styles.ListItems}>
            {availableTimes.map(({ time, info }, index) => (
              <li
                key={index}
                className={selectedTime === time ? styles.selectedTime : ''}
                onClick={() => handleTimeClick(time)}
              >
                {time } - {info}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bookingButtonContainer}>
        <button className={styles.cancelButton} onClick={cancelBooking}>Avbryt</button>
        <button className={styles.ConfirmButton} onClick={handleBooking}>Boka</button>
      </div>
    </>
  );
};

export default BookingPage;
