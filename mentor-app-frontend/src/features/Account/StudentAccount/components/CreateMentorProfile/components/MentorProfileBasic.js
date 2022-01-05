import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FooterButtons from "../../../../../../features/Registration/components/common/components/FooterButtons";
import UploadAvatar from "../../../../../../features/Registration/components/common/components/UploadAvatar";
import { useGetProfileStep1 } from "../hooks/useGetProfileStep1";

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
  const history = useHistory();

  const [profileBasic, setProfileBasic] = useState({
    avatar: "",
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
          setAvatar={(e) => formik.setFieldValue("avatar", e.target.value)}
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
        {formik.touched.username && formik.errors.username && (
          <p className={customClasses.error}>{formik.errors.username}</p>
        )}

        <TextField
          variant="outlined"
          placeholder="Mentor Email"
          label="Mentor Email"
          fullWidth={true}
          className={customClasses.textfield}
          value={formik.values.mentorEmail}
          onChange={(e) => formik.setFieldValue("mentorEmail", e.target.value)}
        />
        {formik.touched.mentorEmail && formik.errors.mentorEmail && (
          <p className={customClasses.error}>{formik.errors.mentorEmail}</p>
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

        <FooterButtons
          handleNext={formik.handleSubmit}
        />
      </div>
    </formik>
  );
};

export default MentorProfileBasic;
