// React imports
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap imports
import { Modal, Button, Table, Container } from "react-bootstrap";

// Styles
import styles from "../styles/Information.module.css";

// My own imports
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { MoreDropdown } from "./MoreDropdown";
import { AlertContext } from "../contexts/AlertContext";

// Toastify notificatons

function InformationList() {
  const [information, setInformation] = useState([]);
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    axiosReq.get("/information/").then((response) => {
      if (Array.isArray(response.data.results)) {
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const filteredInformation = response.data.results.filter(
          (info) => new Date(info.end_date) >= today
        );
        setInformation(filteredInformation);
        console.log("Filtered information:", filteredInformation);
      } else {
        setInformation([]);
        console.log("Didn't find anything");
      }
    });
  }, []);

  const handleEdit = (id) => {
    history.push(`/information/${id}/edit`);
  };

  const handleDelete = async (id) => {
    setShowConfirmation(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/information/${deleteId}/`);
      setInformation(information.filter((info) => info.id !== deleteId));
      setAlert("Information deleted successfully!");
      history.push("/");
    } catch (err) {
      console.log(err);
      console.log(deleteId);
    }
    setShowConfirmation(false);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  }

  return (
    <Container className={styles.Information}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Creator</th>
            <th>Message</th>
            <th>Date</th>
            <th>
              <i class="fa-regular fa-pen-to-square"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {information.map((info) => (
            <tr key={info.id}>
              <td>
                <span>{info.owner ? info.owner : "Unknown User"}</span>
              </td>

              <td>{info.text}</td>
              <td>
                {formatDate(info.start_date)} - {formatDate(info.end_date)}
              </td>
              <td>
                {info.is_owner && (
                  <MoreDropdown
                    id={info.id}
                    handleEdit={() => handleEdit(info.id)}
                    handleDelete={() => handleDelete(info.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <Modal
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Table>
    </Container>
  );
}

export default InformationList;
