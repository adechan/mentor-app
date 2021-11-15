import { makeStyles, Typography } from "@material-ui/core";
import React, {useState} from "react";
import AddInterestDialog from "./AddInterestDialog";
import InterestCard from "./InterestCard";

const customStyles = makeStyles(() => ({
  title: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
  },
  subtitle: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  container: {
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  interestContainer: {
    width: "100%",
    height: "100%",
  },
}));

const Interests = () => {
  const customClasses = customStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const interests = ["math", "drawing", "guitar"];
  const possibleInterests = ["painting", "sing"]
  return (
    <>
    <AddInterestDialog 
    openDialog={openDialog}
    handleClose={() => setOpenDialog(false)}
    possibleInterests={possibleInterests}
    />
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          Interests
        </Typography>
        <Typography variant="h5" className={customClasses.subtitle}
        onClick={() => setOpenDialog(true)}
        >
          Looking for more?
        </Typography>
      </div>

      <div className={customClasses.interestContainer}>
        {interests.map((interest) => (
          <InterestCard title={interest} onClick={() => console.log('clicking')} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Interests;
