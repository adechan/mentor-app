import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  Button,
  DialogActions,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import useGetDataForAppointment from "./hooks/useGetDataForAppointment";
import { getDayName } from "../../../../../utils/helpers";
import useCreateAppointment from "./hooks/useCreateAppointment";

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
  text: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 17,
    marginBottom: 5,
  },
}));

const CreateAppointment = ({
  openDialog,
  handleClose,
  courseId,
  mentorId,
  graphQLClient,
}) => {
  const customClasses = customStyle();

  const appointmentData = useGetDataForAppointment(
    graphQLClient,
    mentorId,
    courseId
  );
  const [selectedHourId, setSelectedHourId] = useState("");

  const createAppointment = useCreateAppointment(
    graphQLClient,
    mentorId,
    courseId,
    selectedHourId,
    setSelectedHourId,
    handleClose,
  )

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogContent className={customClasses.container}>
        <Typography variant="h5" className={customClasses.title}>
          <b>Create an appointment</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
          Mentor: <b>{appointmentData.mentorName}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
          Email: <b>{appointmentData.mentorEmail}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
          Course: <b>{appointmentData.courseTitle}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
          Price: <b>{appointmentData.price}</b>
        </Typography>

        <FormControl style={{ width: "100%", marginTop: 10 }}>
          <InputLabel id="subject">Available Times</InputLabel>
          <Select
            labelId="available-time-label-id"
            id="available-time-id"
            label="Available Time"
            value={selectedHourId}
            onChange={(event) => setSelectedHourId(event.target.value)}
          >
            {appointmentData.availableHours.map((item) => (
              <MenuItem value={item.available_hours_id}>
                {getDayName(item.day)} at {item.hour}:00
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createAppointment}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAppointment;
