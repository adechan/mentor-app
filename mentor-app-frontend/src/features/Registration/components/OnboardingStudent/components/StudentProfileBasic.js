import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FooterButtons from "../../common/components/FooterButtons";
import UploadAvatar from "../../common/components/UploadAvatar";
import { useGetProfileBasic } from "../hooks/useGetProfileBasic";
import ErrorMessage from "../../../../Account/common/ErrorMessage"

const customStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: 20,

    "& .MuiInputBase-root": {
      backgroundColor: "white",
    },
  },
  error: {
    margin: 0,
    color: "red",
  },
}));

const StudentProfileBasic = ({ setActiveStep }) => {
  const customClasses = customStyles();

  const [profileBasic, setProfileBasic] = useState({
    avatar: null,
    username: "",
    studentEmail: "",
    country: "",
    city: "",
  });
  const { formik } = useGetProfileBasic(profileBasic);

  useEffect(() => {
    setActiveStep(1);
  }, []);

  useEffect(() => {
    setProfileBasic({
      avatar: formik.values.avatar,
      username: formik.values.username,
      studentEmail: formik.values.studentEmail,
      country: formik.values.country,
      city: formik.values.city,
    });
  }, [formik.values]);

  console.log(formik.values.avatar);

  return (
    <formik onSubmit={formik.onSubmit}>
      <div style={{ marginTop: 30 }}>
        <UploadAvatar
          avatar={formik.values.avatar}
          setAvatar={(e) => formik.setFieldValue("avatar", e.target.files[0])}
        />

        <TextField
          variant="outlined"
          placeholder="Username"
          label="Username"
          fullWidth={true}
          value={formik.values.username}
          onChange={(e) => formik.setFieldValue("username", e.target.value)}
          className={customClasses.textfield}
        />

        <ErrorMessage
          showMessage={formik.touched.username && formik.errors.username}
          errorMessage={formik.errors.username}
        />

        <TextField
          variant="outlined"
          placeholder="Student Email"
          label="Student Email"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.studentEmail}
          onChange={(e) => formik.setFieldValue("studentEmail", e.target.value)}
        />

        <ErrorMessage
          showMessage={
            formik.touched.studentEmail && formik.errors.studentEmail
          }
          errorMessage={formik.errors.studentEmail}
        />

        <TextField
          variant="outlined"
          placeholder="Country"
          label="Country"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.country}
          onChange={(e) => formik.setFieldValue("country", e.target.value)}
        />

        <ErrorMessage
          showMessage={formik.touched.country && formik.errors.country}
          errorMessage={formik.errors.country}
        />

        <TextField
          variant="outlined"
          placeholder="City"
          label="City"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.city}
          onChange={(e) => formik.setFieldValue("city", e.target.value)}
        />

        <ErrorMessage
          showMessage={formik.touched.city && formik.errors.city}
          errorMessage={formik.errors.city}
        />
        <FooterButtons handleNext={formik.handleSubmit} />
      </div>
    </formik>
  );
};

export default StudentProfileBasic;
