import { useCallback, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [buttonCaption, setButtonCaption] = useState("Request Login");
  const [submitError, setSubmitError] = useState("");
  const enableSubmit = useState(false);
  const submit = useCallback(() => {}, []);

  return (
    <>
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
    </>
  );
}
