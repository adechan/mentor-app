import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  makeStyles,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import useAddMentorCourse from "./hooks/useAddMentorCourse";

const customStyle = makeStyles(() => ({
  container: {
    height: "40vh",
  },
  title: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
  },
  textField: {
    marginTop: 15,
    backgroundColor: "white",
  },
  subtitle: {
    marginTop: 30,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 300,
    fontSize: 18,
  },
}));

const AddMentoringSubject = ({
  openDialog,
  handleClose,
  possibleSubjects,
  graphQLClient,
  mentoringSubjects,
  setMentoringSubjects,
}) => {
  const customClasses = customStyle();

  const [addMentorCourseValues, setAddMentorCourseValues] = useState({
    courseId: "",
    courseTitle: "",
    price: 0,
    day: "",
    hours: [],
  });

  const [hours, setHours] = useState({});
  useEffect(() => {
    const hours = Array.from(Array(24).keys());

    const hoursObj = hours.reduce(function (result, item, index, array) {
      result[index] = false;
      return result;
    }, {});

    setHours(hoursObj);
  }, []);

  const handleChange = (event) => {
    setHours({
      ...hours,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    let checkedHours = [];

    for (var key in hours) {
      if (hours[key]) {
        checkedHours.push(parseInt(key));
      }
    }

    setAddMentorCourseValues((prev) => ({
      ...prev,
      hours: checkedHours,
    }));
  }, [hours]);

  const handleAddCourse = useAddMentorCourse(
    graphQLClient,
    addMentorCourseValues,
    setAddMentorCourseValues,
    handleClose,
    mentoringSubjects,
    setMentoringSubjects
  );

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle className={customClasses.title}>
        Select your mentor subject
      </DialogTitle>
      <DialogContent className={customClasses.container}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={possibleSubjects}
          onChange={(event, value) => {
            setAddMentorCourseValues((prev) => ({
              ...prev,
              courseId: value !== null ? value.id : null,
              courseTitle: value !== null ? value.label: null,
            }));
          }} // prints the selected value
          sx={{ width: "auto" }}
          renderInput={(params) => <TextField {...params} label="Subject" />}
        />

        <TextField
          label="Price per hour in LEI/RON"
          variant="standard"
          fullWidth={true}
          className={customClasses.textField}
          value={addMentorCourseValues.price}
          onChange={(e) => {
            setAddMentorCourseValues((prev) => ({
              ...prev,
              price: e.target.value,
            }));
          }}
        />

        <Typography variant="h6" className={customClasses.subtitle}>
          Pick the day:
        </Typography>
        <RadioGroup
          value={addMentorCourseValues.day}
          onChange={(e) =>
            setAddMentorCourseValues((prev) => ({
              ...prev,
              day: e.target.value,
            }))
          }
        >
          <FormControlLabel value={"0"} control={<Radio />} label="Monday" />

          <FormControlLabel value={"1"} control={<Radio />} label="Tuesday" />

          <FormControlLabel value={"2"} control={<Radio />} label="Wednesday" />

          <FormControlLabel value={"3"} control={<Radio />} label="Thursday" />

          <FormControlLabel value={"4"} control={<Radio />} label="Friday" />

          <FormControlLabel value={"5"} control={<Radio />} label="Saturday" />

          <FormControlLabel value={"6"} control={<Radio />} label="Sunday" />
        </RadioGroup>

        <Typography variant="h6" className={customClasses.subtitle}>
          Pick the available hours:
        </Typography>
        <FormGroup>
          <FormControlLabel
            value={"0"}
            control={
              <Checkbox checked={hours[0]} onChange={handleChange} name="0" />
            }
            label="00:00 - 01:00"
          />
          <FormControlLabel
            value={"1"}
            control={
              <Checkbox checked={hours[1]} onChange={handleChange} name="1" />
            }
            label="01:00 - 02:00"
          />
          <FormControlLabel
            value={"2"}
            control={
              <Checkbox checked={hours[2]} onChange={handleChange} name="2" />
            }
            label="02:00 - 03:00"
          />
          <FormControlLabel
            value={"3"}
            control={
              <Checkbox checked={hours[3]} onChange={handleChange} name="3" />
            }
            label="03:00 - 04:00"
          />
          <FormControlLabel
            value={"4"}
            control={
              <Checkbox checked={hours[4]} onChange={handleChange} name="4" />
            }
            label="04:00 - 05:00"
          />
          <FormControlLabel
            value={"5"}
            control={
              <Checkbox checked={hours[5]} onChange={handleChange} name="5" />
            }
            label="05:00 - 06:00"
          />
          <FormControlLabel
            value={"6"}
            control={
              <Checkbox checked={hours[6]} onChange={handleChange} name="6" />
            }
            label="06:00 - 07:00"
          />
          <FormControlLabel
            value={"7"}
            control={
              <Checkbox checked={hours[7]} onChange={handleChange} name="7" />
            }
            label="07:00 - 08:00"
          />
          <FormControlLabel
            value={"8"}
            control={
              <Checkbox checked={hours[8]} onChange={handleChange} name="8" />
            }
            label="08:00 - 09:00"
          />
          <FormControlLabel
            value={"9"}
            control={
              <Checkbox checked={hours[9]} onChange={handleChange} name="9" />
            }
            label="09:00 - 10:00"
          />
          <FormControlLabel
            value={"10"}
            control={
              <Checkbox checked={hours[10]} onChange={handleChange} name="10" />
            }
            label="10:00 - 11:00"
          />
          <FormControlLabel
            value={"11"}
            control={
              <Checkbox checked={hours[11]} onChange={handleChange} name="11" />
            }
            label="11:00 - 12:00"
          />
          <FormControlLabel
            value={"12"}
            control={
              <Checkbox checked={hours[12]} onChange={handleChange} name="12" />
            }
            label="12:00 - 13:00"
          />
          <FormControlLabel
            value={"13"}
            control={
              <Checkbox checked={hours[13]} onChange={handleChange} name="13" />
            }
            label="13:00 - 14:00"
          />
          <FormControlLabel
            value={"14"}
            control={
              <Checkbox checked={hours[14]} onChange={handleChange} name="14" />
            }
            label="14:00 - 15:00"
          />
          <FormControlLabel
            value={"15"}
            control={
              <Checkbox checked={hours[15]} onChange={handleChange} name="0" />
            }
            label="15:00 - 16:00"
          />
          <FormControlLabel
            value={"16"}
            control={
              <Checkbox checked={hours[16]} onChange={handleChange} name="16" />
            }
            label="16:00 - 17:00"
          />
          <FormControlLabel
            value={"17"}
            control={
              <Checkbox checked={hours[17]} onChange={handleChange} name="17" />
            }
            label="17:00 - 18:00"
          />
          <FormControlLabel
            value={"18"}
            control={
              <Checkbox checked={hours[18]} onChange={handleChange} name="18" />
            }
            label="18:00 - 19:00"
          />
          <FormControlLabel
            value={"19"}
            control={
              <Checkbox checked={hours[19]} onChange={handleChange} name="19" />
            }
            label="19:00 - 20:00"
          />
          <FormControlLabel
            value={"20"}
            control={
              <Checkbox checked={hours[20]} onChange={handleChange} name="20" />
            }
            label="20:00 - 21:00"
          />
          <FormControlLabel
            value={"21"}
            control={
              <Checkbox checked={hours[21]} onChange={handleChange} name="21" />
            }
            label="21:00 - 22:00"
          />
          <FormControlLabel
            value={"22"}
            control={
              <Checkbox checked={hours[22]} onChange={handleChange} name="22" />
            }
            label="22:00 - 23:00"
          />
          <FormControlLabel
            value={"23"}
            control={
              <Checkbox checked={hours[23]} onChange={handleChange} name="23" />
            }
            label="23:00 - 00:00"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setAddMentorCourseValues({
              courseId: "",
              price: 0,
              day: "",
              hours: [],
            });
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAddCourse}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMentoringSubject;
