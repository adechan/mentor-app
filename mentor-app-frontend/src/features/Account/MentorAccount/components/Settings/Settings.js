import { makeStyles, Typography, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FooterButtons from "../../../StudentAccount/components/Settings/FooterButtons";
import useGetMentorSettingsInfo from "./hooks/useGetMentorSettingsInfo";
import useUpdateMentorSettingsInfo from "./hooks/useUpdateMentorSettingsInfo";

const customStyles = makeStyles((theme) => ({
  title: {
    padding: 20,
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
  },
  container: {
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
  },
  subContainer: {
    marginLeft: 20,
    width: "40vw",

    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField: {
    marginBottom: 15,
    "& .MuiInputBase-root": {
      backgroundColor: "white",
    },
  },
  buttonsContainer: {
    display: "flex",
    "& > button:first-child": {
      marginRight: 15,
    },
  },
}));

const Settings = ({graphQLClient}) => {
  const customClasses = customStyles();
  const initialSettings = useGetMentorSettingsInfo(graphQLClient);

  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    mentorUsername: "",
    email: "",
    country: "",
    city: "",
    description: "",
    hobbies: "",
    quote: "",
  });

  useEffect(() => {
   if (initialSettings) {
     setAccountInfo({
      firstName: initialSettings.firstName,
      lastName: initialSettings.lastName,
      mentorUsername: initialSettings.mentorUsername,
      email: initialSettings.email,
      country: initialSettings.country,
      city: initialSettings.city,
      description: initialSettings.description,
      hobbies: initialSettings.hobbies,
      quote: initialSettings.quote,
     })
   }
   console.log(initialSettings)
  }, [initialSettings])


  const updateMentorSettings = useUpdateMentorSettingsInfo(graphQLClient, accountInfo)

  const cancelUpdateMentorSettings = () => {
      setAccountInfo({
       firstName: initialSettings.firstName,
       lastName: initialSettings.lastName,
       mentorUsername: initialSettings.mentorUsername,
       email: initialSettings.email,
       country: initialSettings.country,
       city: initialSettings.city,
       description: initialSettings.description,
       hobbies: initialSettings.hobbies,
       quote: initialSettings.quote,
      })
  }

  return (
    <div className={customClasses.container}>
      <div className={customClasses.row}>
        <Typography variant="h5" className={customClasses.title}>
          My Settings
        </Typography>
      </div>

      <div className={customClasses.subContainer}>
        <TextField
          label="First Name"
          variant="outlined"
          value={accountInfo.firstName}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
          fullWidth={true}
          className={customClasses.textField}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={accountInfo.lastName}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
          fullWidth={true}
          className={customClasses.textField}
        />
            <TextField
          label="Username"
          variant="outlined"
          value={accountInfo.mentorUsername}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              mentorUsername: e.target.value,
            }))
          }
          fullWidth={true}
          className={customClasses.textField}
        />
        <TextField
          label="Mentor Email"
          variant="outlined"
          value={accountInfo.email}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          fullWidth={true}
          className={customClasses.textField}
        />
        <TextField
          label="Country"
          variant="outlined"
          value={accountInfo.country}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              country: e.target.value,
            }))
          }
          fullWidth={true}
          className={customClasses.textField}
        />
        <TextField
          label="City"
          variant="outlined"
          value={accountInfo.city}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
          fullWidth={true}
          className={customClasses.textField}
        />

        <TextField
          fullWidth={true}
          label="Description about yourself"
          multiline
          rows={3}
          variant="outlined"
          className={customClasses.textField}
          value={accountInfo.description}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        <TextField
          fullWidth={true}
          label="Your hobbies"
          multiline
          rows={2}
          variant="outlined"
          className={customClasses.textField}
          value={accountInfo.hobbies}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              hobbies: e.target.value,
            }))
          }
        />

        <TextField
          fullWidth={true}
          label="A quote that describes you."
          multiline
          rows={2}
          variant="outlined"
          className={customClasses.textField}
          value={accountInfo.quote}
          onChange={(e) =>
            setAccountInfo((prev) => ({
              ...prev,
              quote: e.target.value,
            }))
          }
        />

        <FooterButtons
          handleCancel={cancelUpdateMentorSettings}
          handleSave={updateMentorSettings}
        />
      </div>
    </div>
  );
};

export default Settings;
