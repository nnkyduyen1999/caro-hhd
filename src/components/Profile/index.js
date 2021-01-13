import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../commons/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetail";
import FinishedGames from "./FinishGames";
import Header from "../Header/header";
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthenticationContext } from "../../providers/authenticationProvider";
import { apiGetUserById } from "../../service/user-service";

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

const Account = ({ match }) => {
  const classes = useStyles();
  //const {userInfo} = useContext(AuthenticationContext).authenState;
  const [userInfo, setUserInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGetUserById(match.params.id)
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data);
          setIsLoading(false);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    {isLoading ? <CircularProgress />  : 
    <>
    <Header homeActive={true} />
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Profile info={userInfo} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails info={userInfo} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              {/* <Profile info={userInfo}/> */}
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <FinishedGames match={match} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
    }
      
    </>
  );
};

export default Account;
