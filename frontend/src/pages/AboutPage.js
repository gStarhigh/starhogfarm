import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Map from "../components/GoogleMaps";

import styles from "../styles/AboutPage.module.css";

function AboutPage() {
  return (
    <div>
      <section className={styles.AboutSection}>
        <div>
          <h1 className={styles.AboutHeadline}>Vilka är vi?</h1>
        </div>
        <hr />
      </section>
      <div className="about-main d-flex flex-nowrap">
        <Container fluid>
          <Row className="featurett">
            <Col md={5}>
              <img
                src="https://res.cloudinary.com/draygqe7t/image/upload/v1699965816/media/images/resizedImage_itrdue.png"
                alt=""
                className={styles.AboutImg}
              />
            </Col>
            <Col md={7}>
              <h3>Maria Starhög</h3>
              <p>
                Maria Starhög är dressyrryttare ut i fingerspetsarna. Sedan nio
                års ålder har det varit dressyr för hela slanten, även om
                variation är en stor del av upplägget i vardagen. Maria har
                meriter till och med Grand Prix och ridit SM på ponny, junior
                och young rider. Maria är även legitimerad Fysioterapeut till
                yrket och lägger stor vikt vid ryttarens sits och inverkan.
                Ridning ska vara roligt för alla, ryttare som häst. Alla är
                alltid välkomna oavsett kunskap och nivå.
              </p>
            </Col>
          </Row>
          <hr />
          <Row className="featurett">
            <Col md={7}>
              <h3>Gästtränare Heidi Vänttinen</h3>
              <p>
                Gästtränare Heidi Vänttinen, vars häst Kiera for U bor i
                stallet, kommer från Finland, men bor i Skåne sedan 2015. I det
                "civila" jobbar hon som språklärare på högstadiet. Heidi är
                utbildad LA-domare samt ÖD i dressyr sedan 2018 och blev nyligen
                godkänd ÖD även i WE. Hon har deltagit i bl.a. unghästchampionat
                i Finland och Sverige, lag-FM och har tävlat t.o.m. Prix St
                Georges.
              </p>
            </Col>
            <Col md={5}>
              <img
                src="https://res.cloudinary.com/draygqe7t/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1691487115/received_172611130713732_wmhpdd.jpg"
                alt=""
                className={styles.AboutImg}
              />
            </Col>
          </Row>
          <hr />
          <Row className="featurett">
            <Col md={5}>
              <img
                src="https://res.cloudinary.com/draygqe7t/image/upload/v1691502265/123444577_184051683261535_824802158311214574_n_yjw2zu.jpg"
                alt=""
                className={styles.AboutImg}
              />
            </Col>
            <Col md={7}>
              <h3>Ridbanan</h3>
              <p>
                Det är en rymlig 20x60m ridbana med stenmjölsunderlag. Här finns
                även belysning och en enklare hinderpark. Väl inhägnad med
                trästaket. Husets trädgård angränsar till ridbanan på ena sidan
                och de öppna fälten på den andra, vilket kan ge ypperliga
                möjligheter för miljöträning.
              </p>
            </Col>
          </Row>
          <hr />
          <Row className="featurett">
            <Col md={7}>
              <h3>Sommarbete</h3>
              <p>
                Under sommarhalvåret, från maj till oktober blir vår
                förtrollande sommarhage en fristad för unga hästar i åldrarna 1
                till 3 år. Med naturen som sin lekplats kan upp till 10 lekfulla
                unghästar ströva fritt på cirka 6 hektar kuperat naturbete. Det
                är som ett hästparadis där de kan sträcka på benen, skapa nya
                vänner och bara vara sig själva. Vi håller noga koll på dessa
                unga stjärnor och besöker dem minst en gånger om dagen, oftast
                två, för att se till att de är glada och friska. Regn eller
                solsken, vi är där för att säkerställa att de har allt de
                behöver. Det föränderliga vädret bestämmer hur länge de får
                njuta av detta hästparadis, men oavsett om det är en lång sommar
                eller en kortare en så får de utmärkt grundträning i våra
                härliga backar.
                <hr />
                <strong>Inget bete 2024 pga upprustning.</strong>
              </p>
            </Col>
            <Col md={5}>
              <img
                src="https://res.cloudinary.com/draygqe7t/image/upload/c_scale,h_960,q_auto:best/v1691501957/240594785_373990104267691_8073872753669794635_n_xammpg.webp"
                alt=""
                className={styles.AboutImg}
              />
            </Col>
          </Row>
          <hr />
          <Row className="featurett">
            <Col md={5}>
              <img
                src="https://res.cloudinary.com/draygqe7t/image/upload/v1691502351/123466975_184051633261540_2718395644933478477_n_erz6k8.jpg"
                alt=""
                className={styles.AboutImg}
              />
            </Col>
            <Col md={7}>
              <h3>Stallet</h3>
              <p>
                Hos oss finns möjlighet till inackordering på stall. Här finns
                totalt sex boxar, var av två fylls av våra egna hästar. Stallet
                är luftigt och rymligt med två uppställningsplatser, spolplats,
                sadelkammare, foderkammare och loge. Här vistas hästarna ute i
                stora hagar från ca klockan 06 på morgonen till 20 på kvällen så
                ofta som vädret tillåter. Under sommaren går de ute dygnet runt.
                Här ingår halm, alla fodringar, ut- och insläpp samt mockning
                alla dagar i veckan, även julafton, mot att man är behjälplig
                med pass vid behov. Det ska vara enkelt att ha häst hos oss!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <Map />
    </div>
  );
}

export default AboutPage;
