import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import useGetAllRecommendations from "./hooks/useGetAllRecommendations";
import RecommendationCard from "./RecommendationCard";

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

const Recommendations = ({ graphQLClient }) => {
  const customClasses = customStyles();
  const recommendations = useGetAllRecommendations(graphQLClient);

  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          Recommendations
        </Typography>
      </div>

      {recommendations.map((recommendation) => (
        <RecommendationCard recommendation={recommendation} graphQLClient={graphQLClient}/>
      ))}
    </div>
  );
};

export default Recommendations;
