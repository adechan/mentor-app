import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";

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
  forgotPasswordContainer: {
    marginTop: 15,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  forgotPassword: {
    color: "black",
    fontFamily: "Urbanist",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 400,
  },
  button: {
    marginTop: 30,
    textTransform: "capitalize",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const Login = () => {
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
          onClick={() => history.push("/registration")}
        >
          Register
        </Typography>
      </div>

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
      <div className={customClasses.forgotPasswordContainer}>
        <Typography variant="h6" className={customClasses.forgotPassword}>
          Forgot your password?
        </Typography>
      </div>

      <Button
        variant="contained"
        color="primary"
        className={customClasses.button}
        fullWidth={true}
      >
        Next
      </Button>
    </div>
  );
};

export default Login;
