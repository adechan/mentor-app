import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const customStyles = makeStyles((theme) => ({
  subContainer: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  backButton: {
    color: "black",
    marginRight: 10,
  },
  nextButton: {
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const FooterButtons = ({ handleCancel, handleSave }) => {
  const customClasses = customStyles();

  return (
    <div className={customClasses.subContainer}>
      <Button
        color="primary"
        className={customClasses.backButton}
        onClick={handleCancel}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        color="primary"
        className={customClasses.nextButton}
        onClick={handleSave}
      >
        Save changes
      </Button>
    </div>
  );
};

export default FooterButtons;
