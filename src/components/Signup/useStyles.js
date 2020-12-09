import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/img/caro.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  formContainer: {
    alignSelf: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(1),
  },
  btnSection: {
    margin: theme.spacing(3, 0, 2),
  },
  signInBtn: {
    margin: theme.spacing(1, 0, 1),
  },
  btnGoogle: {
    width: "100%",
    '&:hover': {
      background: "#db3236",
      opacity: 0.2,
     },
  },
  btnFacebook: { 
    height:"45px",  
    width: "100%",
    borderRadius: "5px",
    background: "#3b5998",
    color:"white",
    marginHorizontal: "5px",
    lineHeight:"80%",
    marginTop: "22px",
    '&:hover': {
      background: "#3b5998",
      opacity: 0.8,
     },
  },
  
}));
