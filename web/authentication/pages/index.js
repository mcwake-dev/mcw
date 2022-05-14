import React, { useState, useEffect } from "react";

import RemoteValidatedField from "../components/RemoteValidatedField";
import styles from "../styles/Home.module.css";
import { validate as useValidation } from "@mcw/validation";
import {
  usernameSchema,
  emailSchema,
  nameSchema,
  userSchema,
} from "@mcw/validation/user.validation";
import LocalValidatedField from "../components/LocalValidatedField";
export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    console.log("Validating");
    useValidation(userSchema, { username, email, first_name, surname })
      .then((result) => {
        console.log(username, email, first_name, surname);
        const [err, validated] = result;

        if (err) {
          console.log(err);
          console.log("Not Validated");
          setEnableSubmit(false);
        } else {
          console.log("Validated");
          setEnableSubmit(true);
        }
      })
      .catch((err) => {
        setEnableSubmit(false);
      });
  }, [username, email, first_name, surname]);

  return (
    <>
      <RemoteValidatedField
        fieldName="username"
        placeholder="Username"
        setValidatedValue={setUsername}
        schema={usernameSchema}
        validationUrl="http://localhost:8000/api/authentication/exists/username"
      />
      <RemoteValidatedField
        fieldName="email"
        placeholder="Email"
        setValidatedValue={setEmail}
        schema={emailSchema}
        validationUrl="http://localhost:8000/api/authentication/exists/email"
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
      <button type="submit" disabled={!enableSubmit}>
        Register
      </button>
    </>
  );
}
