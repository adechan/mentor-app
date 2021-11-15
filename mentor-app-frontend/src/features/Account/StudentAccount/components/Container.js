import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import Appointments from './Appointments/Appointments';
import Awards from './Awards/Awards';
import Interests from './Interests/Interests/Interests';
import Mentors from './Mentors/Mentors';
import Recommendations from './Recommendations/Recommendations';
import Settings from './Settings/Settings';
import SwitchProfile from './SwitchProfile/SwitchProfile';

const customStyles = makeStyles(() => ({
    scrollableContaienr: {
        height: 'calc(100vh - 60px)',
        width: 'calc(100vw - 200px)',
        overflowY: 'scroll'
    }
}))

const Container = () => {
    const customClasses = customStyles();
    return (
        <div className={customClasses.scrollableContaienr}>
            <Switch>
                <Route path="/student-account/interests" component={() => <Interests />}/>
                <Route path="/student-account/awards" component={() => <Awards />}/>
                <Route path="/student-account/appointments" component={() => <Appointments />}/>
                <Route path="/student-account/my-mentors" component={() => <Mentors />}/>
                <Route path="/student-account/recommendations" component={() => <Recommendations />}/>
                <Route path="/student-account/settings" component={() => <Settings />}/>
                <Route path="/student-account/switch-profile" component={() => <SwitchProfile />}/>
            </Switch>

        </div>
    )
}

export default Container
