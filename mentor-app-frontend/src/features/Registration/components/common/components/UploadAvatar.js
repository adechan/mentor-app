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
const UploadAvatar = () => {
  const customClasses = customStyles();
  const [avatar, setAvatar] = useState("");

  return (
    <>
      <Typography variant="h6" className={customClasses.text}>
        Select your avatar:
      </Typography>
      <input
        type="file"
        id="myFile"
        name="filename"
        onChange={(e) => setAvatar(e.target.value)}
      ></input>
    </>
  );
};

export default UploadAvatar;
