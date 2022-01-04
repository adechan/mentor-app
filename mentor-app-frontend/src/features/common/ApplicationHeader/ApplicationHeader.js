import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "../../../store/slices/accountSlice";

const customStyles = makeStyles((theme) => ({
  headerContainer: {
    height: 60,
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 14.06%, rgba(255, 255, 255, 0.8) 84.9%)",
    boxShadow: "0px 4px 12px rgb(0 0 0 / 12%)",
    backdropFilter: "blur(20px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: "black",
    fontFamily: "Urbanist",
  },
  logOut: {
    color: "black",
    fontFamily: "Urbanist",
    fontSize: 15,
    cursor: "pointer",
    paddingRight: "10px",
  },
}));

const ApplicationHeader = () => {
  const customClasses = customStyles();
  const history = useHistory();

  const selectedProfileId = useSelector((store) => store.account.selectedProfileId);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(accountActions.LOG_OUT());
    history.push("/") 

    // TODO: BE function too?
  }

  return (
    <div className={customClasses.headerContainer}>
      <Typography variant="h5" className={customClasses.text} 
      >
        Mentor App
      </Typography>

      {selectedProfileId && (
        <Typography
          variant="h5"
          className={customClasses.logOut}
          onClick={() => logOut()}
        >
          Log out
        </Typography>
      )}
    </div>
  );
};

export default ApplicationHeader;
