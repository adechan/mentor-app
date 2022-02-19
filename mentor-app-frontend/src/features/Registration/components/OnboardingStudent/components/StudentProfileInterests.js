import { Typography } from "@material-ui/core";
import { makeStyles, TextField } from "@material-ui/core";
import FooterButtons from "../../common/components/FooterButtons";
import React, { useState, useEffect } from "react";
import { useGetProfileThirdStep } from "../hooks/useGetProfileThirdStep";
import useGetAllCourses from "../hooks/useGetAllCourses";
import Autocomplete from "@mui/material/Autocomplete";
import ErrorMessage from "../../../../Account/common/ErrorMessage";

const customStyles = makeStyles((theme) => ({
  description: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
    marginBottom: 20,
  },
  error: {
    margin: 0,
    color: "red",
  },
}));

const StudentProfileInterests = () => {
  const customClasses = customStyles();
  const courses = useGetAllCourses();
  const [subject, setSubject] = useState({
    id: "",
  });

  const { formik } = useGetProfileThirdStep(subject);

  useEffect(() => {
    setSubject({
      id: formik.values.interest,
    });
  }, [formik.values]);

  return (
    <formik onSubmit={formik.onSubmit}>
      <div style={{ marginTop: 30 }}>
        <Typography variant="h6" className={customClasses.description}>
          Pick one subject you are interested in learning.
        </Typography>

        <Autocomplete
          disablePortal
          id="interest-id"
          options={courses}
          onChange={(_, value) => {
            formik.setFieldValue("interest", value !== null ? value.id : null);
          }}
          sx={{ width: "auto" }}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Interest" />}
        />

        <ErrorMessage
          showMessage={formik.touched.interest && formik.errors.interest}
          errorMessage={formik.errors.interest}
        />

        <FooterButtons handleNext={formik.handleSubmit} />
      </div>
    </formik>
  );
};

export default StudentProfileInterests;
