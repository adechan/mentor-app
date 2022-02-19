import React from "react";
import { makeStyles } from "@material-ui/core";

const customStyle = makeStyles(() => ({
  error: {
    margin: 0,
    color: "red",
  },
}));

const ErrorMessage = ({ showMessage, errorMessage }) => {
  const customClasses = customStyle();

  if (!showMessage) {
    return null;
  }
  return <p className={customClasses.error}>{errorMessage}</p>;
};

export default ErrorMessage;
