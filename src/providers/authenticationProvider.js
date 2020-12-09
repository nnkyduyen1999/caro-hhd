import React, { useReducer } from 'react';
import {authenReducer} from "../reducers/authenticationReducer";
import {login, loginGoogle, loginFacebook} from "../actions/authenticationAction";

const initialState = {
    isAuthenticated: false,
    userId: null,
    token: null,
    errMsg: null,
}

const AuthenticationContext = React.createContext();
const AuthenticationProvider = (props) => {
    const [authenState, dispatch] = useReducer(authenReducer, initialState);

    return (
        <AuthenticationContext.Provider
            value={{
                authenState,
                login: login(dispatch),
                loginGoogle: loginGoogle(dispatch),
                loginFacebook: loginFacebook(dispatch)
            }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
}

export {AuthenticationProvider, AuthenticationContext};
