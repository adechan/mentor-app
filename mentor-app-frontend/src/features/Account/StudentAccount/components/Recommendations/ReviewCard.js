import { makeStyles, Typography } from "@material-ui/core";

// TODO
const customStyles = makeStyles(() => ({
  title: {
    color: "black",
    fontFamily: "Urbanist",
    fontWeight: 900,
    fontSize: 20,
  },
  subtitle: {
    color: "#585858",
    fontFamily: "Dancing Script",
    fontWeight: 400,
    fontSize: 24,
    lineHeight: "30px",
    textAlign: "end",

  },
  container: {
    marginBottom: 15,
    width: 250,
    padding: 20,
    backgroundColor: "#ececec8f",

    display: "flex",
    flexDirection: "column",
  },
}));

const ReviewCard = ({ review }) => {
  const customClasses = customStyles();
  return (
    <div className={customClasses.container}>
      <Typography variant="h5" className={customClasses.title}>{review.text}</Typography>
      <Typography variant="h5"
      className={customClasses.subtitle}
      >{`- by ${review.name}`}</Typography>
    </div>
  );
};

export default ReviewCard;
