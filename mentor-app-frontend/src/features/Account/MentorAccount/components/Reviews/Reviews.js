import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ReviewCard from "./ReviewCard";

const customStyles = makeStyles(() => ({
  title: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
  },
  subtitle: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
  },
  container: {
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
  },
  reviewsContainer: {
    width: "100%",
    height: "100%",
  },
}));

const Reviews = () => {
  const customClasses = customStyles();

  const reviews = [
    {
      title: "Math",
      review: 'She was the best mentor I\'ve ever had!',
      date: "27 november 2021",
      student: "Student1",
    },
    {
        title: "Math",
        review: 'She was the best mentor I\'ve ever had!',
        date: "27 november 2021",
        student: "Student1",
      },
  ];
  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>
        My Reviews
      </Typography>

      <div className={customClasses.reviewsContainer}>
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
