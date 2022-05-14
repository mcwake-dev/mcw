import React, { useState, useCallback } from "react";

import RemoteValidatedField from "../components/RemoteValidatedField";
import styles from "../styles/Home.module.css";
import {
  usernameSchema,
  emailSchema,
  nameSchema,
} from "@mcw/validation/user.validation";
import LocalValidatedField from "../components/LocalValidatedField";
export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");

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
      <LocalValidatedField
        fieldName="firstName"
        placeholder="First/Given Name"
        setValidatedValue={setFirstName}
        schema={nameSchema}
      />
      <LocalValidatedField
        fieldName="surname"
        placeholder="Surname/Family Name"
        setValidatedValue={setSurname}
        schema={nameSchema}
      />
    </>
  );
}
