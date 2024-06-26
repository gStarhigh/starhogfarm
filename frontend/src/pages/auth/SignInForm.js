// React imports
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { AlertContext } from "../../contexts/AlertContext";
import axios from "axios";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const setCurrentUser = useSetCurrentUser();
  const { username, password } = signInData;
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { setAlert } = useContext(AlertContext);

  /* Handles form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      setAlert("Du är nu inloggad!");

      // Check if there is a 'from' property in the location.state
      if (history.location.state && history.location.state.from) {
        // Redirect to the original page
        history.replace(history.location.state.from);
      } else {
        // Redirect to the home page
        history.replace("/");
      }
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  /* Handles changes to the form */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${styles.SignInImage}`}
          src={
            "https://res.cloudinary.com/draygqe7t/image/upload/v1691502351/123466975_184051633261540_2718395644933478477_n_erz6k8.jpg"
          }
        />
      </Col>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${styles.Content} p-4 `}>
          <h1 className={styles.Header}>logga in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Användarnamn</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Fyll i användarnamn"
                className={styles.Input}
                value={username}
                onChange={handleChange}
                autoComplete="username"
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Lösenord"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Form.Group>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Logga in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          <div className={`mt-3 ${styles.Content}`}>
            <Link className={styles.Link} to="/signup">
              Inget konto? <span>Skapa ett nu!</span>
            </Link>
          </div>
        </Container>
      </Col>
    </Row>
  );
}

export default SignInForm;
