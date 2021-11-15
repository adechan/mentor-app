import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AwardCard from "./AwardCard";

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
  awardsContainer: {
    width: "100%",
    height: "100%",
  },
}));

const Awards = () => {
  const customClasses = customStyles();

  const awards = [
    {
      title: "Math",
      date: "27 november 2021",
      mentor: "Ade Chan",
    },
    {
      title: "Biology",
      date: "27 november 2021",
      mentor: "Ade Chan",
    },
  ];
  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>
        My Awards
      </Typography>

      <div className={customClasses.awardsContainer}>
        {awards.map((award) => (
          <AwardCard award={award} />
        ))}
      </div>
    </div>
  );
};

export default Awards;
