import React, { useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";

const customStyles = makeStyles((theme) => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    padding: 20,
    width: 200,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    
    [theme.breakpoints.down('xs')]: {
      width: '80vw'
  }
  },
  subContainer: {
    marginBottom: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const StudentCard = ({ student }) => {
  const customClasses = customStyles();

  return (
    <>
      <div className={customClasses.container}>
        <div className={customClasses.subContainer}>
          <Typography variant="h5" className={customClasses.title}>
            <b>{student.name}</b>
          </Typography>
          <Typography variant="h5" className={customClasses.title}>
            {student.subject}
          </Typography>
        </div>

        <Button
          className={customClasses.button}
          variant="contained"
          color="primary"
        >
          Award Student
        </Button>
      </div>
    </>
  );
};

export default StudentCard;
