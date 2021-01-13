import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST} from "../actions/authenticationAction";
import socket from "../socket.io/socket.io";
import {DISCONNECT} from "../socket.io/socket-event";

export const authenReducer = (prevState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const newState = {
                ...prevState,
                isAuthenticated: true,
                userInfo: action.data.userInfo,
                token: action.data.token,
                errMsg: null
            }
            localStorage.setItem('userInfo', JSON.stringify(newState.userInfo));
            localStorage.setItem('token', newState.token);
            return newState;
        case LOGIN_FAILURE:
            return {...prevState, isAuthenticated: false, errMsg: action.data.errMsg};
        case LOGOUT_REQUEST:
            socket.disconnect();
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            return {...prevState, isAuthenticated: false}
        default:
            return new Error();
    }
};

