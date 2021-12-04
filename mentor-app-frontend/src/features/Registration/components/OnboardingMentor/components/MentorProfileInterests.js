import {
  makeStyles,
  TextField,
} from "@material-ui/core";
import FooterButtons from "../../common/components/FooterButtons";
import React from "react";
import { useHistory } from "react-router-dom";

const customStyles = makeStyles((theme) => ({
  description: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
    marginBottom: 20,
  },
    textfield: {
      "& .MuiInputBase-root": {
        backgroundColor: "white",
      },
    },
}));

const MentorProfileInterests = () => {
  const history = useHistory();
  const customClasses = customStyles();

  return (
    <div style={{ marginTop: 30 }}>
      <TextField
        className={customClasses.textfield}
        style={{ marginTop: 20 }}
        fullWidth={true}
        label="Write a quote that describes yourself."
        multiline
        rows={2}
        variant="outlined"
      />

      <FooterButtons handleNext={() => history.push("/mentor-account")} />
    </div>
  );
};

export default MentorProfileInterests;
