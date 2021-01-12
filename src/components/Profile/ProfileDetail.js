import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetail = ({ className, info, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const countRatio = (win, total) => {
    if (total !== 0) {
        return win / total;
    }
    return 0;
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                value={info.firstName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                value={info.lastName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={info.email}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Match"
                    name="total"
                    onChange={handleChange}
                    value={info.total}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Winning ratio"
                    name="ratio"
                    onChange={handleChange}
                    value={countRatio(info.winCount, info.total)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Trophies"
                    name="trophy"
                    onChange={handleChange}
                    value={info.trophy}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetail.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetail;
