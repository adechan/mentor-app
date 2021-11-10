import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  return (
    <div className={customClasses.subContainer}>
      <Button
        color="primary"
        className={customClasses.backButton}
        onClick={() => history.goBack()}
      >
        Back
      </Button>

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
