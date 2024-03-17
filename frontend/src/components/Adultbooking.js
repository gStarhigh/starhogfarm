import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { axiosReq } from "../api/axiosDefaults";
import AdultSpotsLeft from "./AdultSpotsLeft";
import { AlertContext } from "../contexts/AlertContext";

import emailjs from "emailjs-com";

import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../styles/AdultBooking.module.css";

const BookingForm = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { setAlert } = useContext(AlertContext);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    competition_level: "",
    additional_info: "",
    agreement_accepted: false,
    wants_box_spot: 0,
  });
  const [remainingSpots, setRemainingSpots] = useState(null);

  // email js
  const serviceID = "service_bp6z8w3";
  const templateID = "event_created";

  useEffect(() => {
    const fetchRemainingSpots = async () => {
      try {
        const response = await axiosReq.get("/available_spots_adult/");
        setRemainingSpots(response.data.available_spots_adult);
      } catch (error) {
        console.error("Error fetching remaining spots:", error);
      }
    };

    fetchRemainingSpots();
  }, []);

  const {
    full_name,
    phone_number,
    email,
    competition_level,
    additional_info,
    agreement_accepted,
    wants_box_spot,
  } = formData;

  const handleChange = (e) => {
    let value;
    if (e.target.type === "select-multiple") {
      value = Array.from(e.target.selectedOptions, (option) => option.value);
    } else if (e.target.type === "checkbox") {
      value = e.target.checked;
      // För agreement_accepted, uppdatera felmeddelandet baserat på användarens val
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          agreement_accepted: ["Du måste acceptera avtalet för att fortsätta."],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          agreement_accepted: [], // Ta bort eventuella felmeddelanden
        }));
      }
    } else {
      value = e.target.value;
    }
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}; // Skapa ett nytt objekt för att hålla reda på felen

    // Kontrollera om avtalet har accepterats
    if (!agreement_accepted) {
      newErrors.agreement_accepted = [
        "Du måste acceptera avtalet för att boka.",
      ];
    }

    // Kontrollera de andra fälten och sätt felmeddelanden om de är tomma
    if (!full_name) {
      newErrors.full_name = ["Detta fält kan ej vara tomt."];
    }
    if (!phone_number) {
      newErrors.phone_number = ["Detta fält kan ej vara tomt."];
    }
    if (!email) {
      newErrors.email = ["Detta fält kan ej vara tomt."];
    }
    if (!competition_level) {
      newErrors.competition_level = ["Detta fält kan ej vara tomt."];
    }

    // Sätt de nya felen i errors-objektet
    setErrors(newErrors);

    // Om det finns några fel, avbryt och visa dem
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const templateParams = {
      from_event: "Vuxen - 29/30 juli",
      from_name: formData.full_name,
      from_phone: formData.phone_number,
      from_email: formData.email,
      from_info: formData.additional_info,
      from_box: formData.wants_box_spot,
    };

    // Skicka formuläret om alla fält är ifyllda och avtalet har accepterats
    try {
      await axiosReq.post("/adultevent/", formData);
      setRemainingSpots((prevSpots) => prevSpots - 1);
      setAlert(
        "Tack för din bokning! Du får snart ett bekräftelsemejl till email addressen du angav."
      );
      await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        "xWnNr7v5p2qYNDBZo"
      );

      history.push("/");
    } catch (errors) {
      if (errors.response?.status !== 401) {
        setErrors(errors.response?.data);
      }
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className={styles.Row}>
      <Col className={styles.SignUpCol}>
        <Col>
          <Container className={`${styles.Content} p-4 `}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="full_name">
                <Form.Label>Fullständigt namn</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={full_name}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="Förnamn"
                />
                {errors?.full_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group controlId="phone_number">
                <Form.Label>Telefon nummer</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone_number"
                  value={phone_number}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Förnamn"
                />
                {errors?.phone_number?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="namn@exempel.se"
                />
                {errors?.email?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group controlId="competition_level">
                <Form.Label>Välj din tävlingsnivå</Form.Label>
                <Form.Control
                  as="select"
                  name="competition_level"
                  value={competition_level}
                  onChange={handleChange}
                >
                  <option value="">Välj tävlingsnivå</option>
                  <option value="Lätt A">Lätt A</option>
                  <option value="Lätt B">Lätt B</option>
                  <option value="Lätt C">Lätt C</option>
                  <option value="MSV A">MSV A</option>
                  <option value="MSV B">MSV B</option>
                  <option value="MSV C">MSV C</option>
                  <option value="Grand Prix">Grand Prix</option>
                </Form.Control>
                {errors?.competition_level?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <AdultSpotsLeft />
              {/* Render the radio button only if there are remaining spots */}
              {remainingSpots !== null && remainingSpots > 0 && (
                <Form.Group controlId="wants_box_spot">
                  <Form.Label className={styles.Box}>
                    Vill du ha en boxplats?
                  </Form.Label>
                  <Form.Check
                    inline
                    type="radio"
                    name="wants_box_spot"
                    id="yes"
                    value="1"
                    checked={wants_box_spot === 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wants_box_spot: parseInt(e.target.value),
                      })
                    }
                    label="Ja"
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="wants_box_spot"
                    id="no"
                    value="0"
                    checked={wants_box_spot === 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wants_box_spot: parseInt(e.target.value),
                      })
                    }
                    label="Nej"
                  />
                  {errors?.wants_box_spot?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
                </Form.Group>
              )}

              <Form.Group controlId="additional_info">
                <Form.Label>
                  Berätta lite om dig själv och om du har något speciellt du
                  önskar att vi tar upp!
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="additional_info"
                  value={additional_info}
                  onChange={handleChange}
                  rows={3}
                />
                {errors?.additional_info?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <p className={styles.Agreement} onClick={handleShow}>
                Klicka här för att läsa avtalet
              </p>

              <Form.Group controlId="agreement_accepted">
                <Form.Check
                  type="checkbox"
                  name="agreement_accepted"
                  id="agreement_accepted"
                  checked={agreement_accepted}
                  onChange={handleChange}
                  label="Jag har läst och godkänner avtalet."
                />
                {errors?.agreement_accepted?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <button className={styles.Cancel} type="reset">
                Avbryt
              </button>
              <button className={styles.Submit} type="submit">
                Boka
              </button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Boknings Villkor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <strong>Handpenning:</strong> En handpenning om 20% av
                    totalbeloppet måste betalas senast två veckor innan
                    evenemanget börjar för att bekräfta din bokning. Utan
                    fullständig betalning av handpenningen förloras din bokade
                    plats.
                  </p>
                  <p>
                    <strong>Återbetalning:</strong> Om handpenningen betalas men
                    du meddelar oss att du inte kan delta inom två veckor från
                    evenemangets startdatum, kommer handpenningen inte att
                    återbetalas.
                  </p>
                  <p>
                    <strong>Inställda evenemang:</strong> Vid eventuella
                    inställda evenemang från vår sida på grund av ogynnsamma
                    förhållanden eller andra omständigheter som ligger utanför
                    vår kontroll, kommer du att erbjudas full återbetalning av
                    din handpenning.
                  </p>
                  <p>
                    <strong>Förbehåll för ändringar:</strong> Vi förbehåller oss
                    rätten att göra ändringar i evenemangsupplägget, tider eller
                    andra detaljer om det behövs för att säkerställa
                    evenemangets kvalitet och säkerhet.
                  </p>
                  <p>
                    Genom att boka din plats och betala handpenningen godkänner
                    du att du har läst och accepterat dessa bokningsvillkor. Vid
                    frågor eller funderingar är du välkommen att kontakta oss
                    för mer information.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Stäng
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
          </Container>
        </Col>
      </Col>
    </Row>
  );
};

export default BookingForm;
