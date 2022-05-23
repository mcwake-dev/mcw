import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { validateUser } from "../services/user.service";

export default function RegistrationForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [buttonCaption, setButtonCaption] = useState("Register");
  const [submitError, setSubmitError] = useState("");
  const submit = useCallback(() => {
    setSubmitError("");
    setButtonCaption("Registering...");
    register({ username, email, first_name, surname })
      .then((data) => {
        if (data.success) {
          router.push("verify");
        }
      })
      .catch((err) => {
        setButtonCaption("Register");
        setSubmitError(err.message);
      });
  }, []);

  useEffect(() => {
    setSubmitError("");
    validateUser({ username, email, first_name, surname })
      .then((data) => {
        setEnableSubmit(data.success);
      })
      .catch((error) => {
        setSubmitError(error.message);
        setEnableSubmit(false);
      });
  }, [username, email, first_name, surname]);

  return (
    <div className="row bg-darker" id="register">
      <h2>Register</h2>
      <p>
        Complete the registration form to receive an email with a magic link to
        log in
      </p>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          submit();
        }}
      >
        <div className="formField">
          <label htmlFor="username">Username</label>
          <i className="fa fa-user" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Enter your desired Username"
            name="username"
            value={username}
            onChange={(ev) => setUsername(ev.currentTarget.value)}
          />
        </div>
        <div className="formField">
          <label htmlFor="email">Email</label>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <input
            placeholder="Enter your Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.currentTarget.value)}
          />
        </div>
        <div className="formField">
          <label htmlFor="first_name">First/Given Name</label>
          <i className="fa fa-address-card" aria-hidden="true"></i>
          <input
            placeholder="Enter your First/Given Name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={(ev) => setFirstName(ev.currentTarget.value)}
          />
        </div>
        <div className="formField">
          <label htmlFor="surname">Surname/Family Name</label>
          <i className="fa fa-address-card" aria-hidden="true"></i>
          <input
            placeholder="Enter your Surname/Family Name"
            type="text"
            name="surname"
            value={surname}
            onChange={(ev) => setSurname(ev.currentTarget.value)}
          />
        </div>
        <div className="submitError">
          {submitError ? (
            <ul>
              <li>{submitError}</li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="buttonContainer">
          <button type="submit" disabled={!enableSubmit} onClick={submit}>
            <i
              className={[
                "fa",
                enableSubmit ? "fa-thumbs-up" : "fa-thumbs-down",
              ].join(" ")}
            ></i>{" "}
            {buttonCaption}
          </button>
        </div>
      </form>
    </div>
  );
}
