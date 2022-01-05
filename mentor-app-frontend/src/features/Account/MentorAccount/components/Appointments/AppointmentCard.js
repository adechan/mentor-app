import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { getDayName } from "../../../../../utils/helpers";
import useCancelAppointment from "./hooks/useCancelAppointment";
import useAcceptAppointment from "./hooks/useAcceptAppointment";
import useFinishAppointment from "./hooks/useFinishAppointment";

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

  const acceptAppointment = useAcceptAppointment(
    graphQLClient,
    appointment.appointmentId,
    allAppointments,
    setAllAppointments
  );

  const finishAppointment = useFinishAppointment(
    graphQLClient,
    appointment.appointmentId,
    allAppointments,
    setAllAppointments
  );

  return (
    <div className={customClasses.container}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" className={customClasses.title}>
          {appointment.studentName} - {appointment.courseTitle}
        </Typography>
        <Typography variant="h5" className={customClasses.byMentor}>
          Student email: <b>{appointment.studentEmail}</b>
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

      <div style={{ display: "flex", flexDirection: "column" }}>
        {appointment.status !== "ACCEPTED" && (
          <>
            <CheckIcon onClick={acceptAppointment} />
          </>
        )}

        <DeleteIcon onClick={cancelAppointment} />

        {appointment.status === "ACCEPTED" && (
          <Button type="button" onClick={finishAppointment}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
