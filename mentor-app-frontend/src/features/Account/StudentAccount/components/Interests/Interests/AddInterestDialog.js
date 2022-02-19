import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import useAddStudentInterst from "../hooks/useAddStudentInterest";

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
}));

const AddInterestDialog = ({ openDialog, handleClose, possibleInterests, graphQLClient,
interests,
setInterests }) => {
  const [chosenInterest, setChosenInterest] = useState({
    courseId: "",
    courseTitle: "",
  });

  const handleAddInterest = useAddStudentInterst(graphQLClient,
    chosenInterest,
    setChosenInterest,
    handleClose,
    interests,
    setInterests
    )

  const customClasses = customStyle();
  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle className={customClasses.title}>
        Do you want to pick another interest?
      </DialogTitle>
      <DialogContent className={customClasses.container}>
        <Autocomplete
          disablePortal
          id="add-interest-id"
          options={possibleInterests}
          onChange={(_, value) => {
            setChosenInterest((prev) => ({
              ...prev,
              courseId: value !== null ? value.id : null,
              courseTitle: value !== null ? value.label : null,
            }));
          }} 
          sx={{ width: "auto" }}
          renderInput={(params) => <TextField {...params} label="Interest" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddInterest}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInterestDialog;
