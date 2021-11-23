import React from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const customStyles = makeStyles(() => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    cursor: "pointer",
    padding: 20,
    height: 300,
    width: 200,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subContainer: {
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

const MentorCard = ({ mentor }) => {
  const customClasses = customStyles();
const history = useHistory();

  return (
      <>
    <div className={customClasses.container}
    onClick={() => history.push(`/student-account/recommendations/${mentor.id}`)}
    >
      <div className={customClasses.subContainer}
    style={{borderBottom: '1px solid lightgray'}}
      >
        <Avatar src="dasd" style={{ marginBottom: 10 }} />
        <Typography variant="h5" className={customClasses.title}>
          <b>Mentor #1</b>
        </Typography>
        <Typography variant="h5" className={customClasses.title}
        style={{marginBottom: 15}}
        >
          Bacau, Romania
        </Typography>
      </div>

      <div className={customClasses.bottomSubcontainer}>
        <Typography variant="h5" className={customClasses.title}>
        Course:<b> Guitar</b>
        </Typography>
        <Typography variant="h5" className={customClasses.title}
        style={{marginBottom: 15}}
        >
           Price per hour:<b> 13 lei</b>
        </Typography>
      </div>

      <Button
        className={customClasses.button}
        variant="contained"
        color="primary"
      >
       Create appointment
      </Button>
    </div>
    </>
  );
};

export default MentorCard;
