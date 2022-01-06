import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import useGetAllMentors from "./hooks/useGetAllMentors";
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

const Mentors = ({ graphQLClient }) => {
  const customClasses = customStyles();

  const { allMentors, setAllMentors } = useGetAllMentors(graphQLClient);

  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          My Mentors
        </Typography>
      </div>

      <div className={customClasses.interestContainer}>
        {allMentors.map((mentor) => (
          <MentorCard
            mentor={mentor}
            graphQLClient={graphQLClient}
            allMentors={allMentors}
            setAllMentors={setAllMentors}
          />
        ))}
      </div>
    </div>
  );
};

export default Mentors;
