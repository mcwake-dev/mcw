import { useEffect, useContext } from "react";

import AuthenticationContext from "../context/AuthenticationContext";

export default function SetToken() {
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    authCtx
      .getRefreshToken(params.login)
      .then(() => {
        console.log(window.sessionStorage.getItem("refresh"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>Yo</>;
}
