import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import styles from "../styles/Home.module.css";

import { News } from "../components/News";
import { Instagram } from "../components/Instagram.js";
import { Stable } from "../components/Stable";
import Events from "../components/Events";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faHorseHead } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <main className="flex-1">
      <section className={styles.Padding}>
        <div className={styles.Hero}>
          <img
            className={styles.HeroImage}
            src="https://res.cloudinary.com/draygqe7t/image/upload/v1691490074/20201017_083108_czijtu.jpg"
            alt="hero"
          ></img>
          <div className={styles.HeroText}>
            <h2 className={styles.HeroH2}>Starhög {"\n"}Gård</h2>
            <button className={styles.HeroButton}>Logga in</button>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.Welcome}>
          <h4>Välkommen till </h4>
          <h3>STARHÖG GÅRD</h3>
          <p>
            Precis utanför Ängelholm, i en kuperad och välskött miljö på 9
            hektar, finner du Starhög Gård. Gården, som är belägen med närhet
            till både Helsingborg och Ängelholm, är familjen Starhögs
            hjärteprojekt sedan 2019. Här bedrivs en mångfald av aktiviteter,
            där hästar, evenemang och dressyrlektioner utgör kärnan i
            verksamheten.
          </p>
          <p>
            Välkommen till Starhög Gård – där passion för hästar och familjens
            gemenskap förenas i en vacker lantlig omgivning.
          </p>
        </div>
      </section>

      <section className="py-5 py-md-5 py-lg-5">
        <Container className={styles.Padding}>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} className={`${styles.Cards} mb-3`}>
              <div className="d-flex flex-column align-items-center text-center">
              <FontAwesomeIcon icon={faHorseHead} className={styles.FontA} />
                <h2 className="text-2xl font-bold">Boka en lektion</h2>
                <p className="text-muted">
                  Boka en lektion på vår ridbana eller hemma hos er med våra
                  högklassiga instruktörer.
                </p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} className={`${styles.Cards} mb-3`}>
             <div className="d-flex flex-column align-items-center text-center">
                <Link to="/events" className={styles.Link}>
                  <FontAwesomeIcon icon={faCalendarDays} className={styles.FontA} />
                  <h2 className="text-2xl font-bold">Evenemang</h2>
                  <p className="text-muted">Läs mer om våra kommande event!</p>
                </Link>
             </div>
            </Col>
            <Col xs={12} sm={6} md={4} className={`${styles.Cards} mb-3`}>
              <div className="d-flex flex-column align-items-center text-center">
              <FontAwesomeIcon
                  icon={faAddressCard}
                  className={styles.FontA}
                />
                <h2 className="text-2xl font-bold">Kontakta oss</h2>
                <p className="text-muted">
                  Har ni frågor eller behöver hjälp med något? Vi är här för er
                  skull!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
export default HomePage;
