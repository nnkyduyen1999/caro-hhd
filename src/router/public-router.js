import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthenticationContext} from "../providers/authenticationProvider";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const {authenState} = useContext(AuthenticationContext);
    console.log(authenState);
    return (
        <Route {...rest} render={props => (
            authenState.isAuthenticated && restricted ?
                <Redirect to="/home" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
