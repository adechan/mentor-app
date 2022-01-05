import { makeStyles } from '@material-ui/core'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Container from "../components/Container"

const customStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }

    },
}))

const StudentAccount = ({graphQLClient}) => {
    const customClasses = customStyles();
    return (
        <div className={customClasses.container}>
            <Sidebar />
            <Container graphQLClient={graphQLClient}/>
        </div>
    )
}

export default StudentAccount
