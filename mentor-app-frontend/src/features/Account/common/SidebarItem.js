import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const customStyle = makeStyles(() => ({
  text: {
    padding: 10,
    cursor: "pointer",
    fontFamily: "Urbanist",
    fontSize: 18,
    textAlign: "center",

    "&:hover": {
      backgroundColor: "#636fa4",
      color: "white",
    },
  },
}));

const SidebarItem = ({ itemTitle, onClick, selected }) => {
  const customClasses = customStyle();
  return (
    <Typography variant="h5" className={customClasses.text} 
    onClick={onClick} 
    style={{backgroundColor: selected === itemTitle? '#636fa4': 'inherit'}}
    >
      {itemTitle}
    </Typography>
  );
};

export default SidebarItem;
