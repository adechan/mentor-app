import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AwardCard from "./AwardCard";
import useGetAllAwards from "./hooks/useGetAllAwards";

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

const Awards = ({ graphQLClient }) => {
  const customClasses = customStyles();

  const allAwards = useGetAllAwards(graphQLClient);

  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>
        My Awards
      </Typography>

      <div className={customClasses.awardsContainer}>
        {allAwards.map((award) => (
          <AwardCard award={award} />
        ))}
      </div>
    </div>
  );
};

export default Awards;
