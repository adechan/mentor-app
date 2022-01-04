import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useRegistration } from "../hooks/useRegistration";

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
  error: {
    margin: 0,
    color: "red",
  },
}));

const Registration = () => {
  const customClasses = customStyles();
  const history = useHistory();

  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { formik } = useRegistration(accountInfo);

  useEffect(() => {
    console.log(formik.values);
    setAccountInfo(prev => ({
      ...prev,
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword,
    }))
  }, [formik.values]);

  return (
    <form onSubmit={formik.onSubmit}>
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
          value={formik.values.firstName}
          onChange={(e) => formik.setFieldValue("firstName", e.target.value)}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <p className={customClasses.error}>{formik.errors.firstName}</p>
        )}
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth={true}
          className={customClasses.textField}
          value={formik.values.lastName}
          onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <p className={customClasses.error}>{formik.errors.lastName}</p>
        )}
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
        <TextField
          label="Confirm Password"
          type={"password"}
          variant="outlined"
          fullWidth={true}
          className={customClasses.textField}
          value={formik.values.confirmPassword}
          onChange={(e) =>
            formik.setFieldValue("confirmPassword", e.target.value)
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className={customClasses.error}>{formik.errors.confirmPassword}</p>
        )}

        <div className={customClasses.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={customClasses.button}
            fullWidth={true}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Registration;
