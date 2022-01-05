import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { getDayName } from "../../../../../utils/helpers";
import useDeleteMentorCourse from "./hooks/useDeleteMentorCourse";

const customStyles = makeStyles((theme) => ({
  title: {
    marginLeft: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  hour: {
    marginLeft: 70,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    paddingTop: 20,
    height: "auto",
    width: 250,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'space-between',
    alignItems: "start",
    "& svg": {
      padding: 20,
      cursor: "pointer",
    },

    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
  },
}));

const MentoringCard = ({ mentoringSubjects, setMentoringSubjects, mentoringSubject, graphQLClient }) => {
  const customClasses = customStyles();

  const handleDeleteCourse = useDeleteMentorCourse(mentoringSubjects, setMentoringSubjects, graphQLClient);
  
  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>
        Subject: <b>{mentoringSubject.title}</b>
      </Typography>
      <Typography variant="h5" className={customClasses.title}>
        Price per hour: <b>{mentoringSubject.price} Lei</b>
      </Typography>
      <Typography
        variant="h5"
        className={customClasses.title}
        style={{ marginBottom: 10 }}
      >
        Day: {getDayName(mentoringSubject.day)}
      </Typography>

      <Typography
        variant="h5"
        className={customClasses.title}
        style={{ textDecoration: "underline", marginBottom: 10 }}
      >
        AvailableHours:
      </Typography>
      {mentoringSubject.availableHours.map((hour) => (
        <Typography variant="h5" className={customClasses.hour}>
          * {hour}:00 - {hour + 1}:00
        </Typography>
      ))}

      <DeleteIcon onClick={() => handleDeleteCourse(mentoringSubject.id)} />
    </div>
  );
};

export default MentoringCard;
