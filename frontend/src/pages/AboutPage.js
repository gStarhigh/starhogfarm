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
                Träffa Maria, en framstående dressyrryttare vars resa har
                överträffat Grand Prix-arenan för att stärka en ny generation av
                entusiaster. Efter att ha erövrat Grand Prix-tävlingarnas
                intrikatesser kanaliserar Maria nu sin expertis till
                undervisning. Med ett uppmärksamt öga för detaljer och ett
                vårdat tillvägagångssätt guidar hon sina elever mot mästerskap,
                och betonar det symbiotiska partnerskapet mellan ryttare och
                häst. Marias arv sträcker sig bortom medaljer; hon formar
                mångsidiga hästfolk. Hennes lektioner är en fusion av klassisk
                visdom och moderna insikter, främjande inte bara teknisk
                skicklighet utan också en djup uppskattning för dressyrens
                konst. Som en fyr av hängivenhet inspirerar Maria sina elever
                att omfamna värden som omsorg och empati, vilket säkerställer
                att hennes påverkan resoneras långt bortom arenan och formar
                själva essensen av hästvärlden.
              </p>
            </Col>
          </Row>
          <hr />
          <Row className="featurett">
            <Col md={7}>
              <h3>Hedi</h3>
              <p>
                Heidi textHeidi textHeidi textHeidi textHeidi textHeidi
                textHeidi text
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
                Gömd under natthimlen är vår upplysta ridbana en plats där magi
                sker. Det är en rymlig 20x60 meter, glödande mjukt med ljus som
                får den att komma till liv efter mörkrets inbrott. Det är här
                ryttare och deras hästar går samman för att skapa något vackert.
                Det speciella ljuset får allt att se ut som en graciös dans,
                oavsett om det är trav, galopp eller till och med hoppa över
                hinder. Men det är inte bara en vacker syn, det är en rolig
                plats att leka och lära sig på. Det finns olika saker att hoppa
                över, som hinder och bommar, vilket gör träningen super
                spännande. Oavsett om du är ny på ridning eller riktigt erfaren,
                är vår arena som en stor lekplats där du och din häst kan bli de
                bästa av kompisar. Eftersom det är så rymligt är det möjligt att
                rida mer än 1 åt gången. Med vår instruktörs vägledning kommer
                denna ridbana att bli ditt nästa hem!
              </p>
            </Col>
          </Row>
          <hr />
          <Row className="featurett">
            <Col md={7}>
              <h3>Sommarbete</h3>
              <p>
                Under soliga månader från maj till oktober blir vår förtrollande
                sommarhage en fristad för unga hästar i åldrarna 1 till 3 år.
                Med naturen som sin lekplats strövar upp till 10 lekfulla föl
                och unghästar fritt på cirka 6 hektar frodig, grön mark. Det är
                som ett hästparadis där de kan sträcka på benen, skapa nya
                vänner och bara vara sig själva. Vi håller noga koll på dessa
                unga stjärnor och besöker dem minst två gånger om dagen för att
                se till att de är glada och friska. Regn eller solsken, vi är
                där för att säkerställa att de har allt de behöver. Det
                föränderliga vädret bestämmer hur länge de får njuta av detta
                hästparadis, men oavsett om det är en lång sommar eller en
                kortare en, gör dessa unga hästar det mesta av varje ögonblick.
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
                Inbäddad bredvid denna livliga hage är vår mysiga ladugård, ett
                hem hemifrån för dina följeslagare. Med sex rymliga boxar är det
                en fristad för komfort och säkerhet. Varje häst har sin egen
                plats, en plats där de kan vila och ladda efter en dag med
                äventyr på betet. Vi förstår att hästar är unika individer, så
                vi ser till att de har allt de behöver, från mysiga sängkläder
                till rent vatten, för att säkerställa att de är nöjda och lugna.
                Vi har två dedikerade områden för skötsel med all utrustning och
                en praktisk vattenbehållare. Vår ladugård har också två rymliga
                & isolerade sadelrum, perfekta för att förvara all din
                ridutrustning och utrustning. Med gott om plats att organisera
                sadlar, träns och andra väsentligheter kan du vara säker på att
                din utrustning tas om hand och är redo när du är. När det gäller
                dagliga behov, tar vi hand om allt. Matning, mockning av boxar
                och in- och släpp av hästar är alla en del av rutinen. Det
                handlar om att skapa en smidig och stressfri upplevelse för både
                dig och din häst, så att du kan fokusera på att njuta av er tid
                tillsammans.
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
