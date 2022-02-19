import React from "react";
import { makeStyles } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const customStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
    "& .MuiStepper-root": {
      padding: 0,
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#636fa4",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#636fa4",
    },
  },
}));

function getSteps() {
  return ["", "", ""];
}

export default function CustomStepper(activeStep) {
  const customClasses = customStyles();
  const steps = getSteps();

  return (
    <div className={customClasses.root}>
      <Stepper activeStep={activeStep.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
