import { makeStyles } from "@material-ui/core/styles";
import ApplicationHeader from "./features/common/ApplicationHeader/ApplicationHeader";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Welcome from "./features/WelcomePage/views/Welcome";
import Registration from "./features/Registration/views/Registration";
import CreateProfile from "./features/Registration/components/common/CreateProfile/CreateProfile";
import OnboardingStudent from "./features/Registration/components/OnboardingStudent/views/OnboardingStudent";
import StudentAccount from "./features/Account/StudentAccount/views/StudentAccount";
import Login from "./features/Login/views/Login"
import { useState } from "react";
import MentorAccount from "./features/Account/MentorAccount/views/MentorAccount";

const customStyles = makeStyles((theme) => ({
  appContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: "linear-gradient(to right, #e8cbc0 , #636fa4);",
  },
  container: {
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
}));

const App = () => {
  const customClasses = customStyles();
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={customClasses.appContainer}>
      <Router>
        <ApplicationHeader loggedIn={loggedIn}/>
        <>
          <Switch>
            <Route
              path="/student-account"
              component={() => <StudentAccount />}
            />
            <Route
              path="/mentor-account"
              component={() => <MentorAccount />}
            />

            <Route
              path="/student/:username"
              component={() => <div>Student Profile </div>}
            />
            <Route
              path="/mentor/:username"
              component={() => <div>Mentor Profile </div>}
            />

            <Route path="/login" component={() => <Login />} />
            <Route path="/registration" component={() => <Registration />} />
            <Route path="/create-profile" component={() => <CreateProfile />} />
            <Route
              path="/create-profile-student"
              component={() => <OnboardingStudent />}
            />

            <Route
              path="/create-profile-mentor"
              component={() => <OnboardingStudent />}
            />

            <Route path="/" component={() => <Welcome />} />
          </Switch>
        </>
      </Router>
    </div>
  );
};

export default App;
