// React
import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Styles
import styles from "../styles/Home.module.css";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faHorseHead } from "@fortawesome/free-solid-svg-icons";

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
            <h1 className={styles.HeroH2}>Starhög {"\n"}Gård</h1>
            <Link to="/events" className={styles.Link}>
              <button className={styles.HeroButton}>Evenemang</button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.Welcome}>
          <h2>Välkommen till</h2>
          <h3>STARHÖG GÅRD</h3>
          <p>
            Precis utanför Ängelholm, i en kuperad och välskött miljö på 9
            hektar, finner du Starhög Gård. Här bedrivs en mångfald av
            aktiviteter, där hästar, evenemang och dressyrlektioner utgör kärnan
            i verksamheten.
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
                <Link to="/events" className={styles.Link}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className={styles.FontA}
                  />
                  <h2 className="text-2xl font-bold">Evenemang</h2>
                  <p className="text-muted">
                    Läs mer om våra kommande evenemang!
                  </p>
                </Link>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} className={`${styles.Cards} mb-3`}>
              <div className="d-flex flex-column align-items-center text-center">
                <FontAwesomeIcon icon={faHorseHead} className={styles.FontA} />
                <h2 className="text-2xl font-bold">Boka ridlektion</h2>
                <p className="text-muted">Boka ridlektion för Maria Starhög.</p>
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
                  Kontakta oss vid frågor eller funderingar.
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
