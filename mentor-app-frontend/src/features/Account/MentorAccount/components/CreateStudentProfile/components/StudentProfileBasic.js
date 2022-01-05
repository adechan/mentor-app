import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FooterButtons from "../../../../../../features/Registration/components/common/components/FooterButtons";
import UploadAvatar from "../../../../../../features/Registration/components/common/components/UploadAvatar";
import { useGetProfileBasic } from "../hooks/useGetProfileBasic";

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
    avatar: "",
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
     city: formik.values.city
   })
  }, [formik.values])

  return (
    <formik onSubmit={formik.onSubmit}>
      <div style={{ marginTop: 30 }}>
        <UploadAvatar
          avatar={formik.values.avatar}
          setAvatar={(e) => formik.setFieldValue("avatar", e.target.value)}
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
        {formik.touched.username && formik.errors.username && (
          <p className={customClasses.error}>{formik.errors.username}</p>
        )}

        <TextField
          variant="outlined"
          placeholder="Student Email"
          label="Student Email"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.studentEmail}
          onChange={(e) => formik.setFieldValue("studentEmail", e.target.value)}
        />
        {formik.touched.studentEmail && formik.errors.studentEmail && (
          <p className={customClasses.error}>{formik.errors.studentEmail}</p>
        )}

        <TextField
          variant="outlined"
          placeholder="Country"
          label="Country"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.country}
          onChange={(e) => formik.setFieldValue("country", e.target.value)}
        />
        {formik.touched.country && formik.errors.country && (
          <p className={customClasses.error}>{formik.errors.country}</p>
        )}

        <TextField
          variant="outlined"
          placeholder="City"
          label="City"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.city}
          onChange={(e) => formik.setFieldValue("city", e.target.value)}
        />
        {formik.touched.city && formik.errors.city && (
          <p className={customClasses.error}>{formik.errors.city}</p>
        )}
        <FooterButtons handleNext={formik.handleSubmit} />
      </div>
    </formik>
  );
};

export default StudentProfileBasic;
