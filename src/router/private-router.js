import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthenticationContext} from "../providers/authenticationProvider";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {authenState} = useContext(AuthenticationContext);
    console.log(authenState);
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authenState.isAuthenticated ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
