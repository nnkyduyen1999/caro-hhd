import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
   // flexGrow: 1,
    paddingTop: theme.spacing(7),
    height: "100vh",
  },
  paper: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  userName: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  square: {
    width: '30px',
    height: '30px',
    border: 'none',
    margin: '5px',
    borderRadius: '3px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export { useStyles };
