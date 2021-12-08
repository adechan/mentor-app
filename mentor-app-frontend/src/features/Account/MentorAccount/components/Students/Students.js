import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import StudentCard from "./StudentCard"

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

const Students = () => {
  const customClasses = customStyles();

  const students = [{
      name: 'Student1',
      subject: 'Math',
  },
  {
    name: 'Student2',
    subject: 'Math',
},
];
  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          My Students
        </Typography>
      </div>

      <div className={customClasses.interestContainer}>
        {students.map((student) => (
          <StudentCard student={student}/>
        ))}
      </div>
    </div>
  );
};

export default Students;
