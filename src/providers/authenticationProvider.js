import React, { useReducer } from 'react';
import {authenReducer} from "../reducers/authenticationReducer";
import {login} from "../actions/authenticationAction";

const initialState = {
    isAuthenticated: false,
    idUser: null,
    token: null
}
const AuthenticationContext = React.createContext();
const AuthenticationProvider = (props) => {
    const [authenState, dispatch] = useReducer(authenReducer, initialState);

    return (
        <AuthenticationContext.Provider value={{authenState, login: login(dispatch)}}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}

export {AuthenticationProvider, AuthenticationContext};
