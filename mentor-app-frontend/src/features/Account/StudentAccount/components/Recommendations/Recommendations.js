import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import MentorCard from "./MentorCard";

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
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  interestContainer: {
    width: "100%",
    height: "100%",
  },
}));

const Recommendations = () => {
  const customClasses = customStyles();

  const mentors = [{
      name: 'Mentor1',
      subject: 'Math',
      review: 'He was a nice mentor!'
  },
  {
    name: 'Mentor2',
    subject: 'Math',
    review: null
},
{
    name: 'Mentor2',
    subject: 'Math',
    review: null
},
{
    name: 'Mentor2',
    subject: 'Math',
    review: null
}];
  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
        Recommendations
        </Typography>
      </div>

      <MentorCard mentor={{
        id: 1,
        name: 'mentor1',
        subject: 'subject'
      }}/>

      {/* <div className={customClasses.interestContainer}>
        {mentors.map((mentor) => (
        ))}
      </div> */}
    </div>
  );
};

export default Recommendations;
