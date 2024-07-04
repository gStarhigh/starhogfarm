// React import
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// React Bootstrap imports
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Axios import
import axios from "axios";

// Styles
import styles from "../styles/NavBar.module.css";

// My own imports
import logo from "../assets/favicon-horse.png";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { AlertContext } from "../contexts/AlertContext";
import { removeTokenTimestamp } from "../utils/utils";

// Toastify Imports
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

// Toastify style
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const { alert, setAlert } = useContext(AlertContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Shows the confirmation modal
  const confirmSignOut = async () => {
    setShowConfirmation(true);
  };

  // Handles the signout
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setAlert("Du är nu utloggad!");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {}
    setShowConfirmation(false);
  };

  /* If a user is logged in */
  const loggedInIcons = (
    <>
      <NavLink to="/" className={styles.NavLink}>
        {currentUser?.username}
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={confirmSignOut}>
        <i className="fas fa-sign-out-alt"></i>Logga ut
      </NavLink>
    </>
  );

  /* If a user is logged out */
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-sign-in-alt"></i>Logga in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Skapa konto
      </NavLink>
    </>
  );

  useEffect(() => {
    if (alert && typeof alert === "string" && alert !== "null") {
      toast(alert);
      setAlert(null);
    }
  }, [alert, setAlert]);

  return (
    <Navbar
      expanded={expanded}
      expand="md"
      fixed="top"
      className={styles.NavBar}
    >
      <Container>
        <ToastContainer position="top-center" />
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.img} src={logo} alt="logo" height="45" />
            <span className={styles.BrandText}>Starhög Gård</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
              exact
            >
              <i className="fas fa-home"></i>Hem
            </NavLink>
            {/* <NavLink
              to="/events"
              className={styles.NavLink}
              activeClassName={styles.Active}
              exact
            >
              <i class="fa-regular fa-calendar-days"></i>Evenemang
            </NavLink> */}
            <NavLink
              to="/om-oss"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fa-solid fa-question"></i>Om oss
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Logga ut</Modal.Title>
          </Modal.Header>
          <Modal.Body>Är du säker på att du vill logga ut?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Avbryt
            </Button>
            <Button variant="danger" onClick={handleSignOut}>
              Logga ut
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default NavBar;
