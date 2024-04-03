// React import
import React from "react";

// React Bootstrap import
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className={`p-4`}>
      <Spinner animation="border" variant="light" />
    </div>
  );
};

export default Loader;
