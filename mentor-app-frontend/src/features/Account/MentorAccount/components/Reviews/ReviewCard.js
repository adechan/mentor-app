import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const customStyles = makeStyles((theme) => ({
  title: {
    paddingTop: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
    fontSize: 18,
  },
  byMentor: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 16,
  },
  date: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 16,
    paddingBottom: 15,
  },
  container: {
    height: "auto",
    width: 250,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    "& svg": {
      padding: 20,
      cursor: "pointer",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
}));

const ReviewCard = ({ review }) => {
  const customClasses = customStyles();
  return (
    <div className={customClasses.container}>
      <div className={customClasses.subContainer}>
        <Typography variant="h5" className={customClasses.title}>
          {review.courseTitle}
        </Typography>
        <Typography variant="h5" className={customClasses.byMentor}>
          {review.review}
        </Typography>
      </div>

      <div>
        <Typography variant="h5" className={customClasses.byMentor}>
          - by <b>{review.studentName}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.date}>
          {review.date}
        </Typography>
      </div>
    </div>
  );
};

export default ReviewCard;
