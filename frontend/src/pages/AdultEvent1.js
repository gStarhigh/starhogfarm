import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from "../styles/AdultEvent1.module.css";

function AdultEvent1() {
    const event = {
        headline: "2 dagars Teori & Lektioner",
        date: '29 & 30 Juni 2024',
        schedule: [
            { 
                day: 1, 
                activities: [
                    { name: 'Ridlektion', description: 'Ridlektion för Heidi', time: '09:00-12:00' },
                    { name: 'Lunch', description: 'Lunch', time: '12:00-13:00' },
                    { name: 'Teorilektion', description: 'Teorilektion med info...', time: '13:00-14:00' },
                    { name: 'Fika', description: 'Fika', time: '14:00-14:30' },
                    { name: 'Teorilektion', description: 'Teorilektion med info..', time: '14:30-16:00' },
                    { name: 'Middag', description: 'Grillad middag', time: '16:15->' },
                ] 
            },
            { 
                day: 2, 
                activities: [
                    { name: 'Ridlektion', description: 'Ridlektion för Maria', time: '09:00-12:00' },
                    { name: 'Lunch', description: 'Lunch', time: '12:00-13:00' },
                    { name: 'Programridning', description: 'Programridning för Heidi', time: '14:00-16:00' },
                    { name: 'Avslutande fika', description: 'Fika', time: '16:00->' },
                    
                ] 
            }
        ],
        link: '',
        imageUrl: 'https://res.cloudinary.com/draygqe7t/image/upload/v1691502265/123444577_184051683261535_824802158311214574_n_yjw2zu.jpg',
        description: 'Hello dawdawda wdawd awd awd' // Placeholder for a description
    };

    return (
        <div className={styles.AdultEvent1}>
            <img src={event.imageUrl} alt="Event Image" className={styles.EventImage} />
            <h2 className={styles.Headline}>{event.headline}</h2>
            <h4 className={styles.Date}>{event.date}</h4>
            <p>{event.description}</p>
            <div className={styles.ScheduleContainer}>
    {event.schedule.map((day, dayIndex) => (
        <div key={dayIndex} className={styles.DayContainer}>
            <h3 className={styles.Dag}>Dag{day.day}</h3>
            <ul className={styles.InfoList}>
                {day.activities.map((activity, activityIndex) => (
                    <li key={activityIndex} className={styles.InfoItem}>
                        <p><strong>{activity.name}</strong> ({activity.time})</p>
                        <p>{activity.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    ))}
</div>
<p className={styles.Center}>Pris: 2600:- ink.moms för allt ovanstående inklusive boxplats.</p>
            <button className={styles.HeroButton}>
                <Link to={event.link} style={{ color: 'white' }}>Boka nu!</Link>
            </button>
        </div>
    );
}

export default AdultEvent1;