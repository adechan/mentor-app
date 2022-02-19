import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import useGetAllRecommendedBooks from "./hooks/useGetAllRecommendedBooks";
import RecommendedBookCard from "./RecommendedBookCard";

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

const RecommendedBooks = ({ graphQLClient }) => {
  const customClasses = customStyles();

    const allRecommendations = useGetAllRecommendedBooks(graphQLClient);

  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          My Recommended Books
        </Typography>
      </div>

      <div className={customClasses.interestContainer}>
        {
            allRecommendations.map((recommendation) => (
                <RecommendedBookCard graphQLClient={graphQLClient} book={recommendation} />
            ))
        }
      </div>
    </div>
  );
};

export default RecommendedBooks;
