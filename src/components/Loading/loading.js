import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <img
        src={process.env.PUBLIC_URL + "/Ripple-1s-200px.svg"}
        alt="loading"
        style={{
          width: 200,
          height: 200,
        }}
      />
    </div>
  );
};

export default Loading;
