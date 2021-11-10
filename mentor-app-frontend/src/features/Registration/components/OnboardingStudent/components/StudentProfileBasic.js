import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import FooterButtons from "../../common/components/FooterButtons";
import UploadAvatar from "../../common/components/UploadAvatar";

const customStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: 20,

    "& .MuiInputBase-root": {
      backgroundColor: "white",
    },
  },
}));

const StudentProfileBasic = ({ setActiveStep }) => {
  const customClasses = customStyles();
  const history = useHistory();

  useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <UploadAvatar />

      <TextField
        variant="outlined"
        placeholder="Username"
        label="Username"
        fullWidth={true}
        className={customClasses.textfield}
      />

      <TextField
        variant="outlined"
        placeholder="Country"
        label="Country"
        fullWidth={true}
        className={customClasses.textfield}
      />

      <TextField
        variant="outlined"
        placeholder="City"
        label="City"
        fullWidth={true}
        className={customClasses.textfield}
      />

      <FooterButtons
        handleNext={() => history.push("/create-profile-student/personal")}
      />
    </div>
  );
};

export default StudentProfileBasic;
