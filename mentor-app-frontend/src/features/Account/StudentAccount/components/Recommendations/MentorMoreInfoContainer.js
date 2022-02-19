import React from "react";
import {  makeStyles, Typography } from "@material-ui/core";
import ReviewCard from "./ReviewCard";

const customStyles = makeStyles(() => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 20,
  },
  quote: {
    color: "#585858",
    fontFamily: "Dancing Script",
    fontWeight: 400,
    fontSize: 30,
    lineHeight: "30px",
    textAlign: "center",

    marginBottom: 20,
  },
  container: {
    height: "100%",
    width: "100%",

    position: "relative",
  },
  subContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",

    marginBottom: 20,
  },
  bottomSubcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",

    marginBottom: 15,
  },
  buttonContainer: {},
  button: {
    fontSize: 12,
    border: "1px solid black",
    color: "white",
    backgroundColor: "black",

    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const MentorMoreInfoContainer = ({ graphQLClient, profileInfo }) => {
  const customClasses = customStyles();

  return (
    <>
      <div className={customClasses.container}>
        <div className={customClasses.subContainer}>
          <Typography variant="h5" className={customClasses.title}>
            <b>{profileInfo.username}</b>
          </Typography>
          <Typography variant="h5" className={customClasses.title}>
            {profileInfo.city}, {profileInfo.country}
          </Typography>
        </div>

        <Typography variant="h5" className={customClasses.quote}>
          "{profileInfo.quote}"
        </Typography>

        <div className={customClasses.bottomSubcontainer}>
          <Typography
            variant="h5"
            className={customClasses.title}
            style={{ textDecoration: "underline", marginBottom: 15 }}
          >
            Courses that I mentor:
          </Typography>

          <div>
            {profileInfo.courses.map((course) => (
              <Typography variant="h5" className={customClasses.title}>
                {`- ${course.course_title} : ${course.price} Lei`}
              </Typography>
            ))}
          </div>
        </div>

        <div className={customClasses.bottomSubcontainer}>
          <Typography
            variant="h5"
            className={customClasses.title}
            style={{ textDecoration: "underline", marginBottom: 15 }}
          >
            Latest 3 reviews:
          </Typography>

          <div>
            {profileInfo.reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorMoreInfoContainer;
