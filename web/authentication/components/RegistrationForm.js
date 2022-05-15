import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import RemoteValidatedField from "../components/RemoteValidatedField";
import styles from "../styles/RegistrationForm.module.css";
import { validate as useValidation } from "@mcw/validation";
import {
  usernameSchema,
  emailSchema,
  nameSchema,
  userSchema,
} from "@mcw/validation/user.validation";
import LocalValidatedField from "../components/LocalValidatedField";
export default function RegistrationForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [buttonCaption, setButtonCaption] = useState("Register");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    useValidation(userSchema, { username, email, first_name, surname })
      .then((result) => {
        const [err, validated] = result;

        if (err) {
          setEnableSubmit(false);
        } else {
          setEnableSubmit(true);
        }
      })
      .catch((err) => {
        setEnableSubmit(false);
      });
  }, [username, email, first_name, surname]);

  const submit = useCallback(() => {
    setSubmitError("");
    fetch("http://localhost:8000/api/authentication/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, first_name, surname }),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push("verify");
      })
      .catch((err) => {
        setSubmitError(err.message);
      });
  }, []);

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
      <button type="submit" disabled={!enableSubmit} onClick={submit}>
        {buttonCaption}
      </button>
      <div className="submitError">{submitError}</div>
    </>
  );
}
