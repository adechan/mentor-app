import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FooterButtons from "../../common/components/FooterButtons";
import UploadAvatar from "../../common/components/UploadAvatar";
import { useGetProfileStep1 } from "../hooks/useGetProfileStep1";
import ErrorMessage from "../../../../Account/common/ErrorMessage";

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

const MentorProfileBasic = ({ setActiveStep }) => {
  const customClasses = customStyles();

  const [profileBasic, setProfileBasic] = useState({
    avatar: null,
    username: "",
    mentorEmail: "",
    country: "",
    city: "",
  });
  const { formik } = useGetProfileStep1(profileBasic);

  useEffect(() => {
    setActiveStep(1);
  }, []);

  useEffect(() => {
    setProfileBasic({
      avatar: formik.values.avatar,
      username: formik.values.username,
      mentorEmail: formik.values.mentorEmail,
      country: formik.values.country,
      city: formik.values.city,
    });
  }, [formik.values]);

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
          className={customClasses.textfield}
          value={formik.values.username}
          onChange={(e) => formik.setFieldValue("username", e.target.value)}
        />

        <ErrorMessage
          showMessage={formik.touched.username && formik.errors.username}
          errorMessage={formik.errors.username}
        />

        <TextField
          variant="outlined"
          placeholder="Mentor Email"
          label="Mentor Email"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.mentorEmail}
          onChange={(e) => formik.setFieldValue("mentorEmail", e.target.value)}
        />

        <ErrorMessage
          showMessage={formik.touched.mentorEmail && formik.errors.mentorEmail}
          errorMessage={formik.errors.mentorEmail}
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

export default MentorProfileBasic;
