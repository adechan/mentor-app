import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useHistory, useParams } from "react-router-dom";
import MentorMoreInfoContainer from "./MentorMoreInfoContainer";
import useGetMenorProfileDetails from "./hooks/useGetMentorProfileDetails";

const customStyles = makeStyles(() => ({
  title: {
    padding: 20,
    paddingLeft: 10,
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
  },
  container: {
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
  },
  row: {
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    padding: 20,
    height: "auto",
    width: "calc(100% - 80px)",
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const MentorMoreInfo = ({ graphQLClient }) => {
  const customClasses = customStyles();
  const history = useHistory();
  const params = useParams();

  const profileInfo = useGetMenorProfileDetails(graphQLClient, params.id);

  return (
    <>
      <div className={customClasses.container}>
        <div className={customClasses.row}>
          <ArrowBackIosNewIcon
            style={{ cursor: "pointer" }}
            onClick={() => history.goBack()}
          />
          <Typography variant="h5" className={customClasses.title}>
            Back
          </Typography>
        </div>

        <div className={customClasses.subContainer}>
          <MentorMoreInfoContainer
            graphQLClient={graphQLClient}
            profileInfo={profileInfo}
          />
        </div>
      </div>
    </>
  );
};

export default MentorMoreInfo;
