import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FooterButtons from "../../../../../../features/Registration/components/common/components/FooterButtons";
import { useGetProfileSecondStep } from "../hooks/useGetProfileSecondStep";
import ErrorMessage from "../../../../common/ErrorMessage";

const customStyles = makeStyles((theme) => ({
  textfield: {
    "& .MuiInputBase-root": {
      backgroundColor: "white",
    },
  },
  error: {
    margin: 0,
    color: "red",
  },
}));

const StudentProfilePersonal = ({ setActiveStep }) => {
  const customClasses = customStyles();

  const [secondStep, setSecondStep] = useState({
    statement: "",
    hobbies: "",
  });
  const { formik } = useGetProfileSecondStep(secondStep);

  useEffect(() => {
    setActiveStep(2);
  }, []);

  useEffect(() => {
    setSecondStep({
      statement: formik.values.statement,
      hobbies: formik.values.hobbies,
    });
  }, [formik.values]);

  return (
    <formik onSubmit={formik.onSubmit}>
      <div style={{ marginTop: 30 }}>
        <TextField
          className={customClasses.textfield}
          fullWidth={true}
          label="Short description about yourself."
          multiline
          rows={3}
          variant="outlined"
          value={formik.values.statement}
          onChange={(e) => formik.setFieldValue("statement", e.target.value)}
        />

        <ErrorMessage
          showMessage={formik.touched.statement && formik.errors.statement}
          errorMessage={formik.errors.statement}
        />

        <TextField
          className={customClasses.textfield}
          style={{ marginTop: 20 }}
          fullWidth={true}
          label="Do you have any hobbies?"
          multiline
          rows={2}
          variant="outlined"
          value={formik.values.hobbies}
          onChange={(e) => formik.setFieldValue("hobbies", e.target.value)}
        />

        <ErrorMessage
          showMessage={formik.touched.hobbies && formik.errors.hobbies}
          errorMessage={formik.errors.hobbies}
        />

        <FooterButtons handleNext={formik.handleSubmit} />
      </div>
    </formik>
  );
};

export default StudentProfilePersonal;
