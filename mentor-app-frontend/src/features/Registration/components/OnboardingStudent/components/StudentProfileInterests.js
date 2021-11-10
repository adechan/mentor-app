import { Typography, FormControl } from "@material-ui/core";
import {
  Button,
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import FooterButtons from "../../common/components/FooterButtons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const customStyles = makeStyles((theme) => ({
  description: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
    marginBottom: 20,
  },
}));

const StudentProfileInterests = () => {
  const history = useHistory();
  const customClasses = customStyles();
  const [subject, setSubject] = useState("");

  return (
    <div style={{ marginTop: 30 }}>
      <Typography variant="h6" className={customClasses.description}>
        Pick one subject you are interested in learning.
      </Typography>

      <FormControl style={{ width: "50%" }}>
        <InputLabel id="subject">Subjects</InputLabel>
        {/* Create a list  with possible subjects */}
        <Select
          labelId="subject-label"
          id="subject-id"
          value={subject}
          label="Subject"
          onChange={(event) => setSubject(event.target.value)}
        >
          {/* TODO: list of many subjects (math, piano, etc) */}
          <MenuItem value={"math"}>Math</MenuItem>
          <MenuItem value={"piano"}>Piano</MenuItem>
          <MenuItem value={"english"}>English</MenuItem>
        </Select>
      </FormControl>

      <FooterButtons handleNext={() => history.push("/student-account")} />
    </div>
  );
};

export default StudentProfileInterests;
