import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextareaAutosize,
  Button,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import useReviewMentor from "./hooks/useReviewMentor";
import useEditReviewMentor from "./hooks/useEditReviewMentor";
import StarRating from "./common/StarRating";

const customStyle = makeStyles(() => ({
  title: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
  },
  dialogStyle: {
    minWidth: 700,
  },
}));

const MentorReview = ({
  openDialog,
  handleClose,
  mentor,
  graphQLClient,
  allMentors,
  setAllMentors,
  type,
}) => {
  const customClasses = customStyle();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);

  const reviewMentor = useReviewMentor(
    graphQLClient,
    mentor,
    review,
    stars,
    handleClose,
    allMentors,
    setAllMentors
  );

  const editReviewMentor = useEditReviewMentor(
    graphQLClient,
    mentor,
    review,
    stars,
    handleClose,
    allMentors,
    setAllMentors
  );
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      className={customClasses.dialogStyle}
    >
      <DialogTitle className={customClasses.title}>
        Do you want to review <b>{mentor.mentorName}</b>?
      </DialogTitle>
      <DialogContent>
        <TextareaAutosize
          maxRows={5}
          aria-label="Review"
          placeholder="Write your review here:"
          defaultValue={review ? review : mentor.review}
          onChange={(e) => setReview(e.target.value)}
          style={{ width: "90%" }}
        />
      </DialogContent>
      <DialogContent>
        <StarRating
          initialRating={mentor.stars}
          stars={stars}
          setStars={setStars}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            if (type === "REVIEW") {
              reviewMentor();
            } else {
              editReviewMentor();
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MentorReview;
