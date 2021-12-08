import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AppointmentCard from "./AppointmentCard";

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

const Appointments = () => {
  const customClasses = customStyles();

  const appoitments = [
    {
      mentor: "Mentor1",
      subject: "Math",
      price: "34 lei",
      date: "16 November",
      status: "Accepted",
      mentorEmail: 'ade.enter@yahoo.com'
    },
    {
        mentor: "Mentor2",
        subject: 'Paintig',
        price: "34 lei",
        date: "16 November",
        status: 'In pending',
        mentorEmail: 'ade.enter@yahoo.com'
    },
  ];
  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>
        My Appoitments
      </Typography>

      <div className={customClasses.appoitmentsContainer}>
        {appoitments.map((appoitment) => (
            <AppointmentCard  appoitment={appoitment}/>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
