import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { validateEmail, login } from "../services/user.service";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [buttonCaption, setButtonCaption] = useState("Request Login");
  const [submitError, setSubmitError] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const submit = useCallback(() => {
    setSubmitError("");
    setButtonCaption("Requesting Login...");
    login(email)
      .then((data) => {
        if (data.success) {
          router.push("verify");
        }
      })
      .catch((err) => {
        setButtonCaption("Request Login");
        setSubmitError(err.message);
      });
  }, []);

  useEffect(() => {
    setSubmitError("");
    validateEmail(email)
      .then((data) => {
        setEnableSubmit(data.success);
      })
      .catch((error) => {
        setSubmitError(error.message);
        setEnableSubmit(false);
      });
  }, [email]);

  return (
    <div className="row bg-mid-light" id="login">
      <h2>Login</h2>
      <p>Enter the email address you registered with to log in</p>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          submit();
        }}
      >
        <div className="formField">
          <label htmlFor="email">Registered Email</label>
          <i className="fa fa-at" aria-hidden="true"></i>
          <input
            placeholder="Enter your registered email address"
            type="email"
            name="email"
            value={email}
            onChange={(ev) => setEmail(ev.currentTarget.value)}
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
