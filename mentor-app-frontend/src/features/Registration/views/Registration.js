import { TextField, Typography, Button,  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import React from "react";

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

        [theme.breakpoints.down('xs')]: {
          width: 'calc(100vw - 100px)', 
          marginLeft: 'auto',
          marginRight: 'auto'
        }
    },
  containerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
  },
  loginText: {
    color: "black",
    fontFamily: "Urbanist",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "17px",
  },
  textField: {
    marginTop: 15,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
  },
  button: {
    marginTop: 30,
    backgroundColor: "black",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const Registration = () => {
  const customClasses = customStyles();
  const history = useHistory();

  return (
    <div className={customClasses.transparentContainer}>
      <div className={customClasses.containerHeader}>
        <Typography variant="h5" className={customClasses.title}>
          Join Mentor App
        </Typography>

        <Typography
          variant="h5"
          className={customClasses.loginText}
          onClick={() => history.push("/login")}
        >
          Login
        </Typography>
      </div>

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth={true}
        className={customClasses.textField}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth={true}
        className={customClasses.textField}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth={true}
        className={customClasses.textField}
      />
      <TextField
        label="Password"
        type={"password"}
        variant="outlined"
        fullWidth={true}
        className={customClasses.textField}
      />
      <TextField
        label="Confirm Password"
        type={"password"}
        variant="outlined"
        fullWidth={true}
        className={customClasses.textField}
      />

      <div className={customClasses.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={customClasses.button}
          fullWidth={true}
          onClick={() => history.push("/create-profile")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Registration;
