import { useState, useEffect } from "react";

import AuthenticationContext from "./AuthenticationContext";

export const AuthenticationProvider = ({ children }) => {
  const [resourceToken, setResourceToken] = useState("");

  const getRefreshToken = (loginToken) => {
    fetch("");
  };

  const setRefreshToken = (refresh) => {
    window.sessionStorage.setItem("refresh", refresh);
  };

  const removeRefreshToken = () => {
    window.sessionStorage.removeItem("refresh");
  };

  const updateResourceToken = (resource) => {
    setResourceToken(resource);
  };

  const authContext = {
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    updateResourceToken,
  };

  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};
