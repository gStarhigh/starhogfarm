import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AlertContext } from "../contexts/AlertContext";

import emailjs from "emailjs-com";

import { Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../styles/Contact.module.css";

function Contact() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { setAlert } = useContext(AlertContext);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    question: "",
  });

  // email js
  const serviceID = "service_bp6z8w3";
  const templateID = "template_reka4qg";

  const { full_name, phone_number, email, question } = formData;

  const handleChange = (e) => {
    let value;
    if (e.target.type === "select-multiple") {
      value = Array.from(e.target.selectedOptions, (option) => option.value);
    } else if (e.target.type === "checkbox") {
      value = e.target.checked;
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          agreement_accepted: ["Du måste acceptera avtalet för att fortsätta."],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          agreement_accepted: [],
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

    const newErrors = {};

    if (!full_name) {
      newErrors.full_name = ["Detta fält kan ej vara tomt."];
    }
    if (!phone_number) {
      newErrors.phone_number = ["Detta fält kan ej vara tomt."];
    }
    if (!email) {
      newErrors.email = ["Detta fält kan ej vara tomt."];
    }
    if (!question) {
      newErrors.question = ["Detta fält kan ej vara tomt."];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const templateParams = {
      from_name: formData.full_name,
      from_phone: formData.phone_number,
      from_email: formData.email,
      from_question: formData.question,
    };

    try {
      await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        "xWnNr7v5p2qYNDBZo"
      );
      history.push("/");
      setAlert("Tack för ditt meddelande! Vi återkopplar så snart vi kan.");
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
    }
  };

  return (
    <Row
      className={`${styles.Row} ${
        errors && Object.keys(errors).length > 0 ? styles.HasErrors : ""
      }`}
    >
      <Col className={styles.SignUpCol}>
        <Col>
          <Container className={`${styles.Content} p-4 `}>
            <h1 className={styles.Headline}>Kontakta oss</h1>
            <Form onSubmit={handleSubmit} onReset={() => setFormData({})}>
              <Form.Group controlId="full_name">
                <Form.Label>Fullständigt namn *</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={full_name}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="Fullständigt namn"
                />
                {errors?.full_name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group controlId="phone_number">
                <Form.Label>Telefonnummer *</Form.Label>
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
                  placeholder="Telefonnummer"
                />
                {errors?.phone_number?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email *</Form.Label>
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

              <Form.Group controlId="question">
                <Form.Label>Meddelande *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="question"
                  value={question}
                  onChange={handleChange}
                  rows={4}
                />
                {errors?.additional_info?.map((message, idx) => (
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
            </Form>
          </Container>
        </Col>
      </Col>
    </Row>
  );
}

export default Contact;
