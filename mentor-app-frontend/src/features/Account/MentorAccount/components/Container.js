import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import Reviews from './Reviews/Reviews';
import Mentoring from './Mentoring/Mentoring';
import Settings from "./Settings/Settings"
import Appointments from './Appointments/Appointments';
import Students from './Students/Students';

const customStyles = makeStyles((theme) => ({
    scrollableContaienr: {
        height: 'calc(100vh - 60px)',
        width: 'calc(100vw - 200px)',
        overflowY: 'scroll',

        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            width: '100vw'
        }
    }
}))

const Container = () => {
    const customClasses = customStyles();
    return (
        <div className={customClasses.scrollableContaienr}>
            <Switch>
                <Route path="/mentor-account/reviews" component={() => <Reviews />} />
                <Route path="/mentor-account/mentoring" component={() => <Mentoring />} />
                <Route path="/mentor-account/settings" component={() => <Settings />}/>
                <Route path="/mentor-account/appointments" component={() => <Appointments />}/>
                <Route path="/mentor-account/my-students" component={() => <Students />}/>
            </Switch>

        </div>
    )
}

export default Container
