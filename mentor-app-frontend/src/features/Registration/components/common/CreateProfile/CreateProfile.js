import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";

const customStyles = makeStyles((theme) => ({
    transparentContainer: {
        marginTop: 40,
        marginLeft: 40,
        width: 420,
        padding: "30px 40px 20px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 13.00%, rgba(255, 255, 255, 0.8) 87%)",
        boxShadow: "0px 4px 12px rgb(0 0 0 / 12%)",
        borderRadius: "8px",
        backdropFilter: "blur(20px)",
    
        display: "flex",
        flexDirection: "column",
    },
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
    marginBottom: 10,
  },
  description: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
    marginBottom: 20,
  },
  containerCards: {
    display: "flex",
  },
}));

const CreateProfile = () => {
  const customClasses = customStyles();
  const history = useHistory();

  return (
    <div className={customClasses.transparentContainer}>
      <Typography variant="h5" className={customClasses.title}>
        Hey, Andreea Rindasu!
      </Typography>

      <Typography variant="h6" className={customClasses.description}>
        Choose the profile you want to create:
      </Typography>

      <div className={customClasses.containerCards}>
        <ProfileCard
          type="student"
          onClick={() => history.push("/create-profile-student/basic")}
        />
        <ProfileCard
          type="mentor"
          onClick={() => history.push("/create-profile-student")}
        />
      </div>
    </div>
  );
};

export default CreateProfile;
