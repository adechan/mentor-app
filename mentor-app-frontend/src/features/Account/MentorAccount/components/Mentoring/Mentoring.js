import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddMentoringSubject from "./AddMentoringSubject";
import MentoringCard from "./MentoringCard";
import useGetCourses from "./hooks/useGetCourses";
import useGetAllMentorCourses from "./hooks/useGetAllMentorCourses";

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

const Mentoring = ({ graphQLClient }) => {
  const customClasses = customStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const {mentoringSubjects, setMentoringSubjects} = useGetAllMentorCourses(graphQLClient);
  const possibleSubjects = useGetCourses();

  return (
    <>
      <AddMentoringSubject
        openDialog={openDialog}
        handleClose={() => setOpenDialog(false)}
        possibleSubjects={possibleSubjects}
        graphQLClient={graphQLClient}
        mentoringSubjects={mentoringSubjects}
        setMentoringSubjects={setMentoringSubjects}
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
          {mentoringSubjects.map((mentoringSubject) => (
            <MentoringCard
              setMentoringSubjects={setMentoringSubjects}
              mentoringSubjects={mentoringSubjects}
              mentoringSubject={mentoringSubject}
              graphQLClient={graphQLClient}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Mentoring;
