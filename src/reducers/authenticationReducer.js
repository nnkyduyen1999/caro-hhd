import {LOGIN_SUCCESS, LOGIN_FAILURE} from "../actions/authenticationAction";

export const authenReducer = (prevState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        isAuthenticated: true,
        token: action.data.token,
        userId: action.data.userId,
      };
    case LOGIN_FAILURE:
      return { ...prevState, isAuthenticated: false };
    default:
      return new Error();
  }
};
