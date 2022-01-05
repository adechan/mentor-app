import React, { useState } from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CreateAppointment from "./CreateAppointment";

const customStyles = makeStyles((theme) => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    padding: 20,
    height: 300,
    width: 300,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      width: "80vw",
    },
  },
  subContainer: {
    cursor: "pointer",

    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSubcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  button: {
    fontSize: 12,
    border: "1px solid black",
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const RecommendationCard = ({ recommendation, graphQLClient }) => {
  const customClasses = customStyles();
  const history = useHistory();
  const [openCreateAppointment, setOpenCreateAppointment] = useState(false);

  return (
    <>
      <CreateAppointment
        recommendation={recommendation}
        openDialog={openCreateAppointment}
        handleClose={() => setOpenCreateAppointment(false)}
        mentorId={recommendation.mentorId}
        courseId={recommendation.courseId}
        graphQLClient={graphQLClient}
      />

      <div className={customClasses.container}>
        <div
          className={customClasses.subContainer}
          style={{ borderBottom: "1px solid lightgray" }}
          onClick={() =>
            history.push(
              `/student-account/recommendations/${recommendation.mentorId}`
            )
          }
        >
          <Avatar src="dasd" style={{ marginBottom: 10 }} />
          <Typography variant="h5" className={customClasses.title}>
            <b>{recommendation.mentorName}</b>
          </Typography>
          <Typography
            variant="h5"
            className={customClasses.title}
            style={{ marginBottom: 15 }}
          >
            {recommendation.mentorCity}, {recommendation.mentorCountry}
          </Typography>
        </div>

        <div
          className={customClasses.bottomSubcontainer}
          style={{ marginTop: 10 }}
        >
          <Typography variant="h5" className={customClasses.title}>
            Course:<b> {recommendation.courseTitle}</b>
          </Typography>
          <Typography
            variant="h5"
            className={customClasses.title}
            style={{ marginBottom: 15 }}
          >
            Price per hour:<b> {recommendation.price} LEI</b>
          </Typography>
        </div>

        <Button
          className={customClasses.button}
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateAppointment(true)}
        >
          Create appointment
        </Button>
      </div>
    </>
  );
};

export default RecommendationCard;
