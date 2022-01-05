import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AppointmentCard from "./AppointmentCard";
import useGetAllAppointments from "./hooks/useGetAllAppointments";

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
  appoitmentsContainer: {
    width: "100%",
    height: "100%",
  },
}));

const Appointments = ({ graphQLClient }) => {
  const customClasses = customStyles();

  const { allAppointments, setAllAppointments } =
    useGetAllAppointments(graphQLClient);

  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>
        My Appointments
      </Typography>

      <div className={customClasses.appoitmentsContainer}>
        {allAppointments.map((appointment) => (
          <AppointmentCard
            appointment={appointment}
            graphQLClient={graphQLClient}
            allAppointments={allAppointments}
            setAllAppointments={setAllAppointments}
          />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
