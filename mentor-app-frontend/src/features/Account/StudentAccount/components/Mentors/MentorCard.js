import React, { useState } from "react";
import MentorReview from "./MentorReview";
import { Button, makeStyles, Typography } from "@material-ui/core";
import StarIcon from "@mui/icons-material/Star";

const customStyles = makeStyles((theme) => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    padding: 20,
    width: 330,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      width: "80vw",
    },
  },
  subContainer: {
    marginBottom: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const MentorCard = ({ mentor, graphQLClient, allMentors, setAllMentors }) => {
  const customClasses = customStyles();
  const [isOpenReviewDialog, setIsOpenReviewDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

  return (
    <>
      <MentorReview
        openDialog={isOpenReviewDialog}
        handleClose={() => setIsOpenReviewDialog(false)}
        mentor={mentor}
        graphQLClient={graphQLClient}
        allMentors={allMentors}
        setAllMentors={setAllMentors}
        type="REVIEW"
      />

      <MentorReview
        openDialog={isOpenEditDialog}
        handleClose={() => setIsOpenEditDialog(false)}
        mentor={mentor}
        graphQLClient={graphQLClient}
        allMentors={allMentors}
        setAllMentors={setAllMentors}
        type="EDIT"
      />

      <div className={customClasses.container}>
        <div className={customClasses.subContainer}>
          <Typography variant="h5" className={customClasses.title}>
            <b>{mentor.mentorName}</b>
          </Typography>
          <Typography variant="h5" className={customClasses.title}>
            {mentor.courseTitle}
          </Typography>
        </div>

        {mentor.review && (
          <Typography
            variant="h5"
            className={customClasses.title}
            style={{ marginBottom: 10 }}
          >
            {mentor.review}
          </Typography>
        )}

        <Typography
          variant="h5"
          className={customClasses.title}
          style={{ marginBottom: 10, display: "flex" }}
        >
          Rating:
          <>
            <StarIcon
              style={{
                color: mentor.stars >= 1 ? "orange" : "lavender",
              }}
            />
            <StarIcon
              style={{
                color: mentor.stars >= 2 ? "orange" : "lavender",
              }}
            />
            <StarIcon
              style={{
                color: mentor.stars >= 3 ? "orange" : "lavender",
              }}
            />
            <StarIcon
              style={{
                color: mentor.stars >= 4 ? "orange" : "lavender",
              }}
            />
            <StarIcon
              style={{
                color: mentor.stars >= 5 ? "orange" : "lavender",
              }}
            />
          </>
        </Typography>

        <Button
          className={customClasses.button}
          variant="contained"
          color="primary"
          onClick={() => {
            if (mentor.review) {
              setIsOpenEditDialog(true);
            } else {
              setIsOpenReviewDialog(true);
            }
          }}
        >
          {mentor.review ? "Edit Review" : "Review"}
        </Button>
      </div>
    </>
  );
};

export default MentorCard;
