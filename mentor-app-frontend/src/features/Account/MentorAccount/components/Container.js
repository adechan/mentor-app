import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import Reviews from './Reviews/Reviews';
import Mentoring from './Mentoring/Mentoring';
import Settings from "./Settings/Settings"
import Appointments from './Appointments/Appointments';
import Students from './Students/Students';
import OnboardingStudent from '../components/CreateStudentProfile/views/OnboardingStudent';

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

const Container = ({ graphQLClient }) => {
    const customClasses = customStyles();
    return (
        <div className={customClasses.scrollableContaienr}>
            <Switch>
                <Route path="/mentor-account/reviews" component={() => <Reviews graphQLClient={graphQLClient} />} />
                <Route path="/mentor-account/mentoring" component={() => <Mentoring graphQLClient={graphQLClient}/>} />
                <Route path="/mentor-account/settings" component={() => <Settings  graphQLClient={graphQLClient}/>}/>
                <Route path="/mentor-account/appointments" component={() => <Appointments graphQLClient={graphQLClient}/>}/>
                <Route path="/mentor-account/my-students" component={() => <Students graphQLClient={graphQLClient}/>} />
                <Route path="/mentor-account/create-student" component={() => <OnboardingStudent graphQLClient={graphQLClient}/>}/>
            </Switch>

        </div>
    )
}

export default Container
