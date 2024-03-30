import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/AdultEvent1.module.css";

function KidsEvent() {
  const event = {
    headline: "2 dagars Teori & Lektioner",
    date: "1 & 2 Juli 2024",
    schedule: [
      {
        day: 1,
        activities: [
          {
            name: "Ridlektion.",
            description: "Heidi Vänttinän",
          },
          { name: "Lunch.", description: "" },
          {
            name: "Teorilektion",
            description: "Praktisk hästkunskap.",
          },
          { name: "Fika.", description: "" },
          {
            name: "Teorilektion.",
            description: "Ur domarens synvinkel.",
          },
        ],
      },
      {
        day: 2,
        activities: [
          {
            name: "Ridlektion.",
            description: "Maria Starhög",
          },
          { name: "Lunch.", description: "" },
          {
            name: "Programridning.",
            description: "Heidi Vänmttinän",
          },
          { name: "Avslutande fika.", description: "" },
        ],
      },
    ],
    link: "/ungdomar/event",
    imageUrl:
      "https://res.cloudinary.com/draygqe7t/image/upload/v1691502265/123444577_184051683261535_824802158311214574_n_yjw2zu.jpg",
  };

  return (
    <div className={styles.AdultEvent1}>
      <img src={event.imageUrl} alt="Event" className={styles.EventImage} />
      <h2 className={styles.Headline}>{event.headline}</h2>
      <h4 className={styles.Date}>{event.date}</h4>
      <p>{event.description}</p>
      <div className={styles.ScheduleContainer}>
        {event.schedule.map((day, dayIndex) => (
          <div key={dayIndex} className={styles.DayContainer}>
            <h3 className={styles.Dag}>Dag {day.day}</h3>
            <ul className={styles.InfoList}>
              {day.activities.map((activity, activityIndex) => (
                <li key={activityIndex} className={styles.InfoItem}>
                  <p>
                    <strong>{activity.name}</strong>
                  </p>
                  <p>{activity.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={styles.Center}>Pris: 2300:- ink.moms.</p>
      <p className={styles.Center}>
        Max 5 boxplatser (Halm) finns att hyra för 300:- extra.
      </p>

      <button className={styles.HeroButton}>
        <Link to={event.link} style={{ color: "white" }}>
          Boka nu!
        </Link>
      </button>
    </div>
  );
}

export default KidsEvent;
