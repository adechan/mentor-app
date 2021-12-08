import React from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  Button,
  DialogActions,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

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
      fontSize: 15,
  }
}));

const CreateAppointment = ({ openDialog, handleClose, mentor }) => {
  const possibleHours = [8, 9, 10, 11];
  const customClasses = customStyle();
  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogContent className={customClasses.container}>
        <Typography variant="h5" className={customClasses.title}>
         <b>Create an appointment</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
         Mentor: <b>{mentor.name}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
         Email: <b>{mentor.email}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
         Course: <b>{mentor.subject}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.text}>
         Price: <b>{mentor.price}</b>
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={possibleHours}
          sx={{ width: "auto",  }}
          renderInput={(params) => (
            <TextField {...params} label="Available Hours" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAppointment;
