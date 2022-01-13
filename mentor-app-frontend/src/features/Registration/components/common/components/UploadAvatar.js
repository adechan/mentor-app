import { Avatar, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const customStyles = makeStyles((theme) => ({
  text: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 15,
  },
}));

const UploadAvatar = ({avatar, setAvatar}) => {
  const customClasses = customStyles();

  return (
    <>
      <Typography variant="h6" className={customClasses.text}>
        Select your avatar:
      </Typography>
      <input
        type="file"
        id="myFile"
        name="filename"
        accept="image/*"
        onChange={setAvatar}
      ></input>
    </>
  );
};

export default UploadAvatar;
