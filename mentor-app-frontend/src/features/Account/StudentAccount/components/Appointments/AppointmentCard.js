import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { getDayName } from "../../../../../utils/helpers";
import useCancelAppointment from "./hooks/useCancelAppointment";

const customStyles = makeStyles((theme) => ({
  title: {
    paddingTop: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
    fontSize: 18,
  },
  byMentor: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 16,
  },
  date: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 16,
    paddingBottom: 5,
  },
  container: {
    height: "auto",
    width: 300,
    backgroundColor: "white",
    margin: 20,
    paddingLeft: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& svg": {
      padding: 20,
      cursor: "pointer",
    },

    [theme.breakpoints.down("xs")]: {
      width: "85vw",
    },
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

const AppointmentCard = ({
  appointment,
  graphQLClient,
  allAppointments,
  setAllAppointments,
}) => {
  const customClasses = customStyles();

  const cancelAppointment = useCancelAppointment(
    graphQLClient,
    appointment.appointmentId,
    allAppointments,
    setAllAppointments
  );

  return (
    <div className={customClasses.container}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" className={customClasses.title}>
          {appointment.mentorName} - {appointment.courseTitle}
        </Typography>
        <Typography variant="h5" className={customClasses.byMentor}>
          Mentor email: <b>{appointment.mentorEmail}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.byMentor}>
          Price: <b>{appointment.price}</b>
        </Typography>

        <Typography variant="h5" className={customClasses.date}>
          Date:{" "}
          <b>
            {getDayName(appointment.day)}: {appointment.hour}:00 -{" "}
            {appointment.hour + 1}:00{" "}
          </b>
        </Typography>

        <Typography variant="h5" className={customClasses.date}>
          Status: <b>{appointment.status}</b>
        </Typography>
      </div>

      <DeleteIcon onClick={cancelAppointment} />
    </div>
  );
};

export default AppointmentCard;
