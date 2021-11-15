import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";

const customStyles = makeStyles(() => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    padding: 20,
    height: 100,
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

const MentorCard = ({ mentor }) => {
  const customClasses = customStyles();
  return (
    
    <div className={customClasses.container}>
      <div className={customClasses.subContainer}>
        <Typography variant="h5" className={customClasses.title}>
          <b>{mentor.name}</b>
        </Typography>
        <Typography variant="h5" className={customClasses.title}>
          {mentor.subject}
        </Typography>
      </div>

      <Button
        className={customClasses.button}
        variant="contained"
        color="primary"
      >
        {mentor.review !== null ? 'View Review': 'Review'}
      </Button>
    </div>
  );
};

export default MentorCard;
