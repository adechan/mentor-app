import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddMentoringSubject from "./AddMentoringSubject";

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
    cursor: "pointer",
    textDecoration: "underline",
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

const Mentoring = () => {
  const customClasses = customStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const subjects = ["math", "drawing", "guitar"];
  const possibleSubjects = ["painting", "sing"];
  return (
    <>
      <AddMentoringSubject
        openDialog={openDialog}
        handleClose={() => setOpenDialog(false)}
        possibleSubjects={possibleSubjects}
      />
      <div className={customClasses.container}>
        <div className={customClasses.row}>
          <Typography variant="h5" className={customClasses.title}>
            Mentoring
          </Typography>
          <Typography
            variant="h5"
            className={customClasses.subtitle}
            onClick={() => setOpenDialog(true)}
          >
            Add
          </Typography>
        </div>

        <div className={customClasses.interestContainer}>
          {/* {interests.map((interest) => (
          <InterestCard title={interest} onClick={() => console.log('clicking')} />
        ))} */}
        </div>
      </div>
    </>
  );
};

export default Mentoring;
