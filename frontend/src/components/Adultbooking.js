import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import AdultSpotsLeft from "./AdultSpotsLeft";
import { AlertContext } from "../contexts/AlertContext";
import Alert from "react-bootstrap/Alert";

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
  });

  const {
    full_name,
    phone_number,
    email,
    competition_level,
    additional_info,
    agreement_accepted,
  } = formData;

  const handleChange = (e) => {
    let value;
    if (e.target.type === "select-multiple") {
      value = Array.from(e.target.selectedOptions, (option) => option.value);
    } else if (e.target.type === "checkbox") {
      value = e.target.checked; // Använd checked-attributet för att få boolean-värdet för kryssrutan
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
    const missingFields = [];

    // Validera varje fält och lägg till felmeddelanden till listan
    if (!full_name) {
      missingFields.push("Fullständigt namn");
    }
    if (!phone_number) {
      missingFields.push("Telefonnummer");
    }
    if (!email) {
      missingFields.push("E-postadress");
    }
    if (!competition_level) {
      missingFields.push("Tävlingsnivå");
    }
    if (!additional_info) {
      missingFields.push("Informationstext");
    }
    if (!agreement_accepted) {
      missingFields.push("Godkänna Avtalet");
    }

    // Om det finns saknade fält, visa felmeddelanden
    if (missingFields.length > 0) {
      const errorMessage = `Följande fält saknas: ${missingFields.join(", ")}`;
      setAlert(errorMessage);
      return;
    }

    // Send a POST request to your Django backend
    try {
      await axiosReq.post("/adultevent/", formData);
      setAlert(
        "Tack för din bokning! Du får snart ett bekräftelsemejl till email addressen du angav."
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
      </Form.Group>
      {errors?.full_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      </Form.Group>
      {errors?.phone_number?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="namn@exempel.se"
        />
      </Form.Group>
      {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      </Form.Group>
      {errors?.competition_level?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="additional_info">
        <Form.Label>
          Berätta lite om dig själv och om du har något speciellt du önskar att
          vi tar upp!
        </Form.Label>
        <Form.Control
          as="textarea"
          name="additional_info"
          value={additional_info}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      {errors?.additional_info?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <p style={{ cursor: "pointer" }} onClick={handleShow}>
        Klicka här för att läsa avtalet
      </p>
      <AdultSpotsLeft />
      <Form.Group controlId="agreement_accepted">
        <Form.Check
          type="checkbox"
          name="agreement_accepted"
          id="agreement_accepted"
          checked={agreement_accepted}
          onChange={handleChange}
          label="Jag har läst och godkänner avtalet."
        />
      </Form.Group>
      {errors?.agreement_accepted?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <button type="reset">Avbryt</button>
      <button type="submit">Boka</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Boknings Villkor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Handpenning:</strong> En handpenning om 20% av totalbeloppet
            måste betalas senast två veckor innan evenemanget börjar för att
            bekräfta din bokning. Utan fullständig betalning av handpenningen
            förloras din bokade plats.
          </p>
          <p>
            <strong>Återbetalning:</strong> Om handpenningen betalas men du
            meddelar oss att du inte kan delta inom två veckor från evenemangets
            startdatum, kommer handpenningen inte att återbetalas.
          </p>
          <p>
            <strong>Inställda evenemang:</strong> Vid eventuella inställda
            evenemang från vår sida på grund av ogynnsamma förhållanden eller
            andra omständigheter som ligger utanför vår kontroll, kommer du att
            erbjudas full återbetalning av din handpenning.
          </p>
          <p>
            <strong>Förbehåll för ändringar:</strong> Vi förbehåller oss rätten
            att göra ändringar i evenemangsupplägget, tider eller andra detaljer
            om det behövs för att säkerställa evenemangets kvalitet och
            säkerhet.
          </p>
          <p>
            Genom att boka din plats och betala handpenningen godkänner du att
            du har läst och accepterat dessa bokningsvillkor. Vid frågor eller
            funderingar är du välkommen att kontakta oss för mer information.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default BookingForm;
