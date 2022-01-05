import React from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import ReviewCard from "./ReviewCard";

// TODO
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
  buttonContainer: {
  },
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

const MentorMoreInfoContainer = ({ mentor }) => {
  const customClasses = customStyles();

  const courses = [
    { course: "Biology", price: 10 },
    { course: "Math", price: 20 },
  ];
  const reviews = [
    {
      name: "studet1",
      text: "The nicest teacher in the worl!",
    },
    {
      name: "student2",
      text: "Loved studying biology with her!",
    },
  ];

  return (
    <>
      <div className={customClasses.container}>
        <div className={customClasses.subContainer}>
          <Typography variant="h5" className={customClasses.title}>
            <b>Mentor #1</b>
          </Typography>
          <Typography variant="h5" className={customClasses.title}>
            Bacau, Romania
          </Typography>
        </div>

        <Typography variant="h5" className={customClasses.quote}>
          "Maecenas lobortis nibh eu mi tempus, at aliquam odio euismod. Quisque
          malesuada ultricies massa, tincidunt semper arcu ornare id. Donec
          sagittis vestibulum leo, "
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
            {courses.map((course) => (
              <Typography variant="h5" className={customClasses.title}>
                {`- ${course.course} : ${course.price} Lei`}
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
            {reviews.map((review) => (
              <ReviewCard review={review}/>
            ))}
          </div>
        </div>

        <div className={customClasses.buttonContainer}>
          <Button
            className={customClasses.button}
            variant="contained"
            color="primary"
          >
            Create appointment
          </Button>
        </div>
      </div>
    </>
  );
};

export default MentorMoreInfoContainer;
