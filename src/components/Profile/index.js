import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../commons/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetail";
import Header from "../Header/header";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <>
      <Header homeActive={true} />
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Profile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default Account;
