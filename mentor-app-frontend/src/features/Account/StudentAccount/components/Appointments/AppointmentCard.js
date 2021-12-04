import React from 'react'
import { makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const customStyles = makeStyles((theme) => ({
    title: {
      paddingTop: 20,
      color: "black",
      fontFamily: "Urbanist",
      fontWeight: 900,
      fontSize: 18,
    },
    byMentor: {
        color: "black",
        fontFamily: "Urbanist",
        fontWeight: 400,
        fontSize: 16,
    },
    date: {
        color: "black",
        fontFamily: "Urbanist",
        fontWeight: 400,
        fontSize: 16,
        paddingBottom: 5,
    },
    container: {
        height: 130,
        width: 250,
        backgroundColor: 'white',
        margin: 20,
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        "& svg": {
            padding: 20,
            cursor: 'pointer'
        },

        
        [theme.breakpoints.down('xs')]: {
          width: '85vw'
      }
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
  }));

const AppointmentCard = ({appoitment}) => {
    
  const customClasses = customStyles();
    return (
        <div className={customClasses.container}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" className={customClasses.title}>
                {appoitment.mentor}
            </Typography>
            <Typography variant="h5" className={customClasses.byMentor} >
               Price: <b>{appoitment.price}</b>
            </Typography>
        
            <Typography variant="h5" className={customClasses.date} >
              Date: <b>{appoitment.date}</b>
            </Typography>

            <Typography variant="h5" className={customClasses.date} >
              Status: <b>{appoitment.status}</b>
            </Typography>
            </div>

            <DeleteIcon />
        
        </div>
    )
}

export default AppointmentCard
