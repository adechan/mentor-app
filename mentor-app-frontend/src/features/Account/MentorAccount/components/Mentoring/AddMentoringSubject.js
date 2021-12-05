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

const AddMentoringSubject = ({ openDialog, handleClose, possibleSubjects }) => {
  const customClasses = customStyle();
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
          sx={{ width: "auto" }}
          renderInput={(params) => <TextField {...params} label="Subject" />}
        />

        <TextField
          label="Price per hour in LEI/RON"
          variant="standard"
          fullWidth={true}
          className={customClasses.textField}
        />

        <Typography variant="h6" className={customClasses.subtitle}>
          Pick the available hours:
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="8:00 - 9:00" />
          <FormControlLabel control={<Checkbox />} label="9:00 - 10:00" />
          <FormControlLabel control={<Checkbox />} label="10:00 - 11:00" />
          <FormControlLabel control={<Checkbox />} label="11:00 - 12:00" />
          <FormControlLabel control={<Checkbox />} label="12:00 - 13:00" />
          <FormControlLabel control={<Checkbox />} label="13:00 - 14:00" />
          <FormControlLabel control={<Checkbox />} label="14:00 - 15:00" />
          <FormControlLabel control={<Checkbox />} label="15:00 - 16:00" />
          <FormControlLabel control={<Checkbox />} label="16:00 - 17:00" />
          <FormControlLabel control={<Checkbox />} label="17:00 - 18:00" />
          <FormControlLabel control={<Checkbox />} label="18:00 - 19:00" />
          <FormControlLabel control={<Checkbox />} label="19:00 - 20:00" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMentoringSubject;
