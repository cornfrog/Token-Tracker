import React from "react";

const FormError = ({ error = "" }) => {
  if (error !== "") {
    return <span className="error">{error}</span>;
  }
  return null;
};

export default FormError;
