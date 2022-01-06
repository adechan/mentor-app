import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import useGetAllStudents from "./hooks/useGetAllStudents";
import StudentCard from "./StudentCard";

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

const Students = ({ graphQLClient }) => {
  const customClasses = customStyles();

  const { allStudents, setAllStudents } = useGetAllStudents(graphQLClient);

  console.log(allStudents);
  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          My Students
        </Typography>
      </div>

      <div className={customClasses.interestContainer}>
        {allStudents.map((student) => (
          <StudentCard
            student={student}
            graphQLClient={graphQLClient}
            allStudents={allStudents}
            setAllStudents={setAllStudents}
          />
        ))}
      </div>
    </div>
  );
};

export default Students;
