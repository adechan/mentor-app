import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

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

    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 100px)",
      marginLeft: "auto",
      marginRight: "auto",
    },
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
  error: {
    margin: 0,
    color: "red",
  },
}));

const Login = ({ graphQLClient }) => {
  const customClasses = customStyles();
  const history = useHistory();

  const [accountInfo, setAccountInfo] = useState({
    email: "",
    password: "",
  });

  const { formik } = useLogin(accountInfo, graphQLClient);

  useEffect(() => {
    setAccountInfo((prev) => ({
      ...prev,
      email: formik.values.email,
      password: formik.values.password,
    }));
  }, [formik.values]);

  return (
    <form onSubmit={formik.onSubmit}>
      <div className={customClasses.transparentContainer}>
        <div className={customClasses.containerHeader}>
          <Typography variant="h5" className={customClasses.title}>
            Login
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
          value={formik.values.email}
          onChange={(e) => formik.setFieldValue("email", e.target.value)}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={customClasses.error}>{formik.errors.email}</p>
        )}

        <TextField
          label="Password"
          type={"password"}
          variant="outlined"
          fullWidth={true}
          className={customClasses.textField}
          value={formik.values.password}
          onChange={(e) => formik.setFieldValue("password", e.target.value)}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={customClasses.error}>{formik.errors.password}</p>
        )}

        <Button
          variant="contained"
          color="primary"
          className={customClasses.button}
          fullWidth={true}
          onClick={formik.handleSubmit}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Login;
