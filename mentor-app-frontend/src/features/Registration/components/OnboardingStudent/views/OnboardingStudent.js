import React, { useState } from "react";
import CustomStepper from "../../common/components/CustomStepper"
import StudentProfileBasic from "../components/StudentProfileBasic";
import { Switch, Route } from "react-router-dom";
import StudentProfilePersonal from "../components/StudentProfilePersonal";
import StudentProfileInterests from "../components/StudentProfileInterests";
import { makeStyles } from "@material-ui/core";

const customStyle = makeStyles(() => ({
    transparentContainer: {
        marginTop: 40,
        marginLeft: 40,
        width: 420,
        padding: "30px 40px 20px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 13.00%, rgba(255, 255, 255, 0.8) 87%)",
        boxShadow: "0px 4px 12px rgb(0 0 0 / 12%)",
        borderRadius: "8px",
        backdropFilter: "blur(20px)",
    
        display: "flex",
        flexDirection: "column",
    },
}))

const OnboardingStudent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const customClasses = customStyle();

  return (
    <div className={customClasses.transparentContainer}>
      <CustomStepper activeStep={activeStep} />

      <Switch>
        <Route
          path="/create-profile-student/basic"
          component={() => (
            <StudentProfileBasic setActiveStep={setActiveStep} />
          )}
        />

        <Route
          path="/create-profile-student/personal"
          component={() => (
            <StudentProfilePersonal setActiveStep={setActiveStep} />
          )}
        />

        <Route
          path="/create-profile-student/interests"
          component={() => (
            <StudentProfileInterests setActiveStep={setActiveStep} />
          )}
        />
      </Switch>
    </div>
  );
};

export default OnboardingStudent;
