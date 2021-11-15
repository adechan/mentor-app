import { makeStyles } from '@material-ui/core'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Container from "../components/Container"

const customStyles = makeStyles(() => ({
    container: {
        display: 'flex'
    },
    scrollableContaienr: {
        height: 'calc(100vh - 60px)',
        width: 'calc(100vw - 200px)',
        overflowY: 'scroll'
    }
}))

const StudentAccount = () => {
    const customClasses = customStyles();
    return (
        <div className={customClasses.container}>
            <Sidebar />
            <Container />
        </div>
    )
}

export default StudentAccount
