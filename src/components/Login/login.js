import React, { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../providers/authenticationProvider";

export default function Login() {
  const authenticationContext = useContext(AuthenticationContext);
  useEffect(() => {
    if (authenticationContext.authenState.isAuthenticated) {
      console.log("OK");
    }
  }, [authenticationContext.authenState.isAuthenticated]);
  return (
    <div>
      <h1>Login</h1>
      <h2>{authenticationContext.authenState.token}</h2>
      <button
        onClick={() => {
          authenticationContext.login("username", "pass");
        }}
      >Login</button>
    </div>
  );
}
