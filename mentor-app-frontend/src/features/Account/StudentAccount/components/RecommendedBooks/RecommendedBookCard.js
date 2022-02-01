import React, { useState } from "react";
import { Avatar, makeStyles, TextField, Typography } from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import useRateRecommendedBook from "./hooks/useRateRecommendedBook";

const customStyles = makeStyles((theme) => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 400,
    fontSize: 18,
  },
  container: {
    padding: 20,
    height: "auto",
    width: 300,
    backgroundColor: "white",
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      width: "80vw",
    },
  },
  subContainer: {
    cursor: "pointer",

    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSubcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  button: {
    fontSize: 12,
    border: "1px solid black",
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const RecommendedBookCard = ({ book, graphQLClient }) => {
  const customClasses = customStyles();
  const [rating, setRating] = useState(null);

  const rateBook = useRateRecommendedBook(graphQLClient, book.book_id, rating);

  return (
    <>
      <div className={customClasses.container}>
        <div style={{ display: "flex", alignContent: "center" }}>
          <Avatar src={book.image} style={{ marginRight: 10 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" className={customClasses.title}>
              <b>{book?.title}</b>
            </Typography>
            <Typography variant="h5" className={customClasses.title}>
              {book?.author}
            </Typography>
          </div>
        </div>

        {book?.rating ? (
          <Typography
            variant="h5"
            className={customClasses.title}
            style={{ marginLeft: 10 }}
          >
            <b>{book.rating}</b>
          </Typography>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              value={rating}
              onChangeCapture={(e) => setRating(e.target.value)}
              type={"text"}
              style={{ width: 30, marginRight: 10 }}
            />
            <CheckIcon onClick={rateBook} />
          </div>
        )}
      </div>
    </>
  );
};

export default RecommendedBookCard;
