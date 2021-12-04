import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import FooterButtons from "../../common/components/FooterButtons";

const customStyles = makeStyles((theme) => ({
  textfield: {
    "& .MuiInputBase-root": {
      backgroundColor: "white",
    },
  },
}));

const MentorProfilePersonal = ({ setActiveStep }) => {
  const customClasses = customStyles();
  const history = useHistory();

  useEffect(() => {
    setActiveStep(2);
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <TextField
        className={customClasses.textfield}
        fullWidth={true}
        label="Short description about yourself."
        multiline
        rows={3}
        variant="outlined"
      />

      <TextField
        className={customClasses.textfield}
        style={{ marginTop: 20 }}
        fullWidth={true}
        label="Do you have any hobbies?"
        multiline
        rows={2}
        variant="outlined"
      />

      <FooterButtons
        handleNext={() => history.push("/create-profile-mentor/interests")}
      />
    </div>
  );
};

export default MentorProfilePersonal;
