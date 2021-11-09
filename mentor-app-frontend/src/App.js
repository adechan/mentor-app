import { makeStyles } from "@material-ui/core/styles";
import ApplicationHeader from "./features/common/ApplicationHeader/ApplicationHeader";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

const customStyles = makeStyles((theme) => ({
  appContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: "linear-gradient(to right, #e8cbc0 , #636fa4);",
  },
}));

const App = () => {
  const customClasses = customStyles();

  return (
    <div className={customClasses.appContainer}>
      <Router>
        <ApplicationHeader />

        <Switch>
          <Route path="/account-student" component={() => <div> Student Account </div>} />
          <Route path="/account-mentor" component={() => <div> Mentor Account </div>} />
          
          <Route path="/login" component={() => <div>Login </div>} />
          <Route path="/registration" component={() => <div>Registration </div>} />
          
          <Route path="/student/:username" component={() => <div>Student Profile </div>} />
          <Route path="/mentor/:username" component={() => <div>Mentor Profile </div>} />
          <Route path="/" component={() => <div> Welcome Page </div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
