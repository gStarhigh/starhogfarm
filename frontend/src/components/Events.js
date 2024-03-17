import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../styles/Events.module.css";

function Event({ headline, date, infoList, link }) {
  return (
    <div className={styles.Events}>
      <h1 className={styles.Headline}>{headline}</h1>
      <h2 className={styles.Date}>{date}</h2>
      <ul className={styles.Content}>
        {infoList.map((item, index) => (
          <li className={styles.List} key={index}>
            {item}
          </li>
        ))}
      </ul>
      <button className={styles.HeroButton}>
        <Link to={link} style={{ color: "white" }}>
          Läs mer & Boka
        </Link>
      </button>
    </div>
  );
}

function Events() {
  const event1 = {
    headline: "2 dagars event för 18+.",
    date: "29 & 30 Juni 2024",
    infoList: [
      "2x Teorilektioner.",
      "2x Ridlektioner.",
      "Lunch & Middag.",
      "Endast 2600:- allt inkluderat.",
    ],
    link: "/vuxna/",
  };

  const event2 = {
    headline: "2 dagars event för 12-17år.",
    date: "1 & 2 Juli 2024",
    infoList: [
      "2x Teorilektioner.",
      "Ridlektioner.",
      "Programridning för domare.",
      "Endast 2300:- allt inkluderat.",
    ],
    link: "/ungdomar",
  };

  return (
    <div>
      <Event
        headline={event1.headline}
        date={event1.date}
        infoList={event1.infoList}
        link={event1.link}
      />
      <Event
        headline={event2.headline}
        date={event2.date}
        infoList={event2.infoList}
        link={event2.link}
      />
    </div>
  );
}

export default Events;
