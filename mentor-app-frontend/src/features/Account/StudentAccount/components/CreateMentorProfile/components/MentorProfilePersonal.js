import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FooterButtons from "../../../../../../features/Registration/components/common/components/FooterButtons";
import { useGetProfileStep2 } from "../hooks/useGetProfileStep2";

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

const MentorProfilePersonal = ({ setActiveStep }) => {
  const customClasses = customStyles();
  const history = useHistory();

  const [secondStep, setSecondStep] = useState({
    statement: "",
    hobbies: "",
  });

  const { formik } = useGetProfileStep2(secondStep);

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
        {formik.touched.statement && formik.errors.statement && (
          <p className={customClasses.error}>{formik.errors.statement}</p>
        )}

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
        {formik.touched.hobbies && formik.errors.hobbies && (
          <p className={customClasses.error}>{formik.errors.hobbies}</p>
        )}

        <FooterButtons
          handleNext={formik.handleSubmit}
        />
      </div>
    </formik>
  );
};

export default MentorProfilePersonal;
