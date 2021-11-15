import React from 'react'
import { makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const customStyles = makeStyles(() => ({
    title: {
      padding: 20,
      color: "black",
      fontFamily: "Urbanist",
      fontWeight: 400,
      fontSize: 18
    },
    container: {
        height: 80,
        width: 250,
        backgroundColor: 'white',
        margin: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        "& svg": {
            padding: 20,
            cursor: 'pointer'
        }
    }
  }));

const InterestCard = ({title, onClick}) => {
    
  const customClasses = customStyles();
    return (
        <div className={customClasses.container}>
            <Typography variant="h5" className={customClasses.title}>
                {title}
            </Typography>
            <DeleteIcon onClick={onClick}/>
        </div>
    )
}

export default InterestCard
