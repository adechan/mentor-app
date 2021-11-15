import React from 'react'
import { makeStyles, Typography } from "@material-ui/core";

const customStyles = makeStyles(() => ({
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
        paddingBottom: 15,
    },
    container: {
        height: 100,
        width: 250,
        backgroundColor: 'white',
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        "& svg": {
            padding: 20,
            cursor: 'pointer'
        }
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
  }));

const AwardCard = ({award}) => {
    
  const customClasses = customStyles();
    return (
        <div className={customClasses.container}>
            <div className={customClasses.subContainer}>
            <Typography variant="h5" className={customClasses.title}>
                {award.title}
            </Typography>
            <Typography variant="h5" className={customClasses.byMentor} >
               Awarded by <b>{award.mentor}</b>
            </Typography>
            </div>
        
            <Typography variant="h5" className={customClasses.date} >
              {award.date}
            </Typography>
        </div>
    )
}

export default AwardCard
