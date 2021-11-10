import { makeStyles } from "@material-ui/styles";
import React from "react";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
import { Typography } from "@material-ui/core";

const customStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    width: 180,
    height: 180,
    borderRadius: 5,
    cursor: "pointer",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    marginRight: 20,

    "&:hover": {
      boxShadow: "1px 3px 18px -2px rgba(0,0,0,0.38)",
    },
  },
  img: {
    fontSize: 45,
  },
  text: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
    fontSize: 22,
  },
}));

const ProfileCard = ({ type, onClick }) => {
  const customClasses = customStyles();

  return (
    <div className={customClasses.container} onClick={onClick}>
      {type === "student" ? (
        <PersonIcon className={customClasses.img} />
      ) : (
        <SchoolIcon className={customClasses.img} />
      )}

      <Typography variant="h6" className={customClasses.text}>
        {type === "student" ? "Student" : "Mentor"}
      </Typography>
    </div>
  );
};

export default ProfileCard;
