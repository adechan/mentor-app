import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Switch, Route } from "react-router-dom";
import Appointments from './Appointments/Appointments';
import Awards from './Awards/Awards';
import OnboardingMentor from './CreateMentorProfile/views/OnboardingMentor';
import Interests from './Interests/Interests/Interests';
import Mentors from './Mentors/Mentors';
import MentorMoreInfo from './Recommendations/MentorMoreInfo';
import Recommendations from './Recommendations/Recommendations';
import RecommendedBooks from './RecommendedBooks/RecommendedBooks';
import Settings from './Settings/Settings';

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

const Container = ({graphQLClient}) => {
    const customClasses = customStyles();
    return (
        <div className={customClasses.scrollableContaienr}>
            <Switch>
                <Route path="/student-account/interests" component={() => <Interests graphQLClient={graphQLClient}/>}/>
                <Route path="/student-account/awards" component={() => <Awards  graphQLClient={graphQLClient} />}/>
                <Route path="/student-account/appointments" component={() => <Appointments graphQLClient={graphQLClient} />}/>
                <Route path="/student-account/my-mentors" component={() => <Mentors  graphQLClient={graphQLClient}  />}/>
                <Route path="/student-account/recommendations/:id" component={() => <MentorMoreInfo graphQLClient={graphQLClient} />}/>
                <Route path="/student-account/recommendations" component={() => <Recommendations graphQLClient={graphQLClient}/>}/>
                <Route path="/student-account/recommended-books" component={() => <RecommendedBooks graphQLClient={graphQLClient}/>}/>
                <Route path="/student-account/settings" component={() => <Settings graphQLClient={graphQLClient}/>}/>
                <Route path="/student-account/create-mentor" component={() => <OnboardingMentor graphQLClient={graphQLClient}/>}/>
            </Switch>

        </div>
    )
}

export default Container
