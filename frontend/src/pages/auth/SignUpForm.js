// React imports
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import axios from "axios";

/* Sets username and passwords to an empty string */
const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
  });

  /* Stores the Errors */
  const [errors, setErrors] = useState({});
  /* Checks the users history */
  const history = useHistory();

  /* Stores the username and passwords */
  const { username, firstName, lastName, password1, password2 } = signUpData;

  /* Handle changes to the inputs */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /* Handles the submit action */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={styles.SignInImage}
          src={
            "https://res.cloudinary.com/draygqe7t/image/upload/v1691501957/240594785_373990104267691_8073872753669794635_n_xammpg.jpg"
          }
        />
      </Col>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${styles.Content} p-4 `}>
          <h1 className={styles.Header}>Skapa Konto</h1>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
              <Form.Label>Användarnamn*</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Användarnamn"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="firstName">
              <Form.Label>Förnamn</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Förnamn"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.firstName?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

              <Form.Group controlId="lastName">
              <Form.Label>Efternamn</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Efternamn"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.lastName?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label>Confirm Password*</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Skapa konto
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          <div className={`mt-3 ${styles.Content}`}>
            <Link className={styles.Link} to="/signin">
              Har du redan ett konto? <span>Logga in</span>
            </Link>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
