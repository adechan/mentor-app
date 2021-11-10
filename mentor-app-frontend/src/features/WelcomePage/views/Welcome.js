import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const customStyles = makeStyles((theme) => ({
    transparentContainer: {
        marginTop: 40,
        marginLeft: 40,
        width: 420,
        padding: "30px 40px 20px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 13.00%, rgba(255, 255, 255, 0.8) 87%)",
        boxShadow: "0px 4px 12px rgb(0 0 0 / 12%)",
        borderRadius: "8px",
        backdropFilter: "blur(20px)",
    
        display: "flex",
        flexDirection: "column",
    },
  button: {
    marginTop: 30,
    textTransform: "capitalize",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Welcome = () => {
  const customClasses = customStyles();
  const history = useHistory();

  return (
    <div className={customClasses.transparentContainer}>
      <Typography variant="h5" className={customClasses.title}>
        Welcome to <b>Mentor App</b>
      </Typography>

      <div className={customClasses.container}>
        <Button
          variant="contained"
          color="primary"
          className={customClasses.button}
          onClick={() => history.push('/registration')}
        >
          Registration
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={customClasses.button}
          style={{ marginLeft: 20 }}
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
