import React, { useReducer } from 'react';
import {authenReducer} from "../reducers/authenticationReducer";
import {login, loginGoogle, loginFacebook} from "../actions/authenticationAction";

const getInitialState = () => {
    const isAuth = localStorage.getItem('userInfo');

    if(isAuth === null) {
        return {
            isAuthenticated: false,
            userInfo: null,
            token: null,
            errMsg: null
        }
    }
    return {
        isAuthenticated: true,
        userInfo: JSON.parse(localStorage.getItem('userInfo')),
        token: localStorage.getItem('token'),
        errMsg: null
    }
}

const AuthenticationContext = React.createContext();
const AuthenticationProvider = (props) => {
    const initialState= getInitialState();
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
