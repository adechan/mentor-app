import { Typography, FormControl } from "@material-ui/core";
import { makeStyles, InputLabel, Select, MenuItem } from "@material-ui/core";
import FooterButtons from "../../../../../../features/Registration/components/common/components/FooterButtons";
import React, { useState, useEffect } from "react";
import { useGetProfileThirdStep } from "../hooks/useGetProfileThirdStep";
import useGetAllCourses from "../hooks/useGetAllCourses";
import ErrorMessage from "../../../../common/ErrorMessage";

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

const StudentProfileInterests = ({ graphQLClient }) => {
  const customClasses = customStyles();
  const courses = useGetAllCourses();
  const [subject, setSubject] = useState({
    id: "",
  });

  const { formik } = useGetProfileThirdStep(subject, graphQLClient);

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

        <FormControl style={{ width: "50%" }}>
          <InputLabel id="subject">Subjects</InputLabel>
          <Select
            label="Subject"
            value={formik.values.interest}
            onChange={(event) =>
              formik.setFieldValue("interest", event.target.value)
            }
          >
            {courses.map((course) => (
              <MenuItem value={course.id}>{course.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

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
