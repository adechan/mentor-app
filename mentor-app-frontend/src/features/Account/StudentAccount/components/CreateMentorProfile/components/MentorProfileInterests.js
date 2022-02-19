import { makeStyles, TextField } from "@material-ui/core";
import FooterButtons from "../../../../../../features/Registration/components/common/components/FooterButtons";
import React, { useState, useEffect } from "react";
import { useGetProfileStep3 } from "../hooks/useGetProfileStep3";
import ErrorMessage from "../../../../common/ErrorMessage";

const customStyles = makeStyles((theme) => ({
  description: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
    marginBottom: 20,
  },
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

const MentorProfileInterests = ({graphQLClient}) => {
  const customClasses = customStyles();

  const [thirdStep, setThirdStep] = useState({
    quote: "",
  });

  const { formik } = useGetProfileStep3(thirdStep, graphQLClient);

  useEffect(() => {
    setThirdStep({
      quote: formik.values.quote,
    });
  }, [formik.values]);

  return (
    <formik onSubmit={formik.onSubmit}>
      <div style={{ marginTop: 30 }}>
        <TextField
          className={customClasses.textfield}
          style={{ marginTop: 20 }}
          fullWidth={true}
          label="Write a quote that describes yourself."
          multiline
          rows={2}
          variant="outlined"
          value={formik.values.quote}
          onChange={(e) => formik.setFieldValue("quote", e.target.value)}
        />
        
        <ErrorMessage
          showMessage={formik.touched.quote && formik.errors.quote}
          errorMessage={formik.errors.quote}
        />

        <FooterButtons handleNext={formik.handleSubmit} />
      </div>
    </formik>
  );
};

export default MentorProfileInterests;
