import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import AdultSpotsLeft from "./AdultSpotsLeft";

const BookingForm = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
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

    // Send a POST request to your Django backend
    try {
      await axiosReq.post("/adultevent/", formData);
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

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="name@example.com"
        />
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
      </Form.Group>
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
      <button type="reset">Avbryt</button>
      <button type="submit">Boka</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
