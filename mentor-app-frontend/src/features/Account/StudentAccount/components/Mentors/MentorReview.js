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

const MentorReview = ({ openDialog, handleClose, mentorReview }) => {
  const customClasses = customStyle();
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
    >
      <DialogTitle className={customClasses.title}>
        Do you want to pick another interest?
      </DialogTitle>
      <DialogContent
      className={customClasses.container}
      >
        {mentorReview}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MentorReview;
