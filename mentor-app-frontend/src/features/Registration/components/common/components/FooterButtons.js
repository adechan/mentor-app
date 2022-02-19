import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const customStyles = makeStyles((theme) => ({
  subContainer: {
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

const FooterButtons = ({ handleNext }) => {
  const customClasses = customStyles();

  return (
    <div className={customClasses.subContainer}>
      <Button
        variant="contained"
        color="primary"
        className={customClasses.nextButton}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default FooterButtons;
