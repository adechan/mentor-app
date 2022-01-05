import React, { useState } from "react";
import CustomStepper from "../../../../../../features/Registration/components/common/components/CustomStepper"
import StudentProfileBasic from "../components/StudentProfileBasic";
import { Switch, Route } from "react-router-dom";
import StudentProfilePersonal from "../components/StudentProfilePersonal";
import StudentProfileInterests from "../components/StudentProfileInterests";
import { makeStyles } from "@material-ui/core";

const customStyle = makeStyles((theme) => ({
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

        [theme.breakpoints.down('xs')]: {
          width: 'calc(100vw - 100px)', 
          marginLeft: 'auto',
          marginRight: 'auto'
        }
    },
}))

const OnboardingStudent = ({graphQLClient}) => {
  const [activeStep, setActiveStep] = useState(0);
  const customClasses = customStyle();

  return (
    <div className={customClasses.transparentContainer}>
      <CustomStepper activeStep={activeStep} />

      <Switch>
        <Route
          path="/mentor-account/create-student/basic"
          component={() => (
            <StudentProfileBasic setActiveStep={setActiveStep} />
          )}
        />

        <Route
          path="/mentor-account/create-student/personal"
          component={() => (
            <StudentProfilePersonal setActiveStep={setActiveStep} />
          )}
        />

        <Route
          path="/mentor-account/create-student/interests"
          component={() => (
            <StudentProfileInterests 
            graphQLClient={graphQLClient}
            setActiveStep={setActiveStep} />
          )}
        />
      </Switch>
    </div>
  );
};

export default OnboardingStudent;
