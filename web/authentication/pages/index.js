import React, { useState, useCallback } from "react";

import RemoteValidatedField from "../components/RemoteValidatedField";
import styles from "../styles/Home.module.css";
import { usernameSchema, emailSchema } from "@mcw/validation/user.validation";
export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <RemoteValidatedField
        fieldName="username"
        placeholder="Username"
        setValidatedValue={setUsername}
        schema={usernameSchema}
        validationUrl="http://localhost:8000/api/authentication/exists/username"
        on200={"Username is not available"}
        on404={"Username is available"}
      />
      <RemoteValidatedField
        fieldName="email"
        placeholder="Email"
        setValidatedValue={setEmail}
        schema={emailSchema}
        validationUrl="http://localhost:8000/api/authentication/exists/email"
        on200={"Email is already associated with another account"}
        on404={"Email is valid"}
      />
    </>
  );
}
