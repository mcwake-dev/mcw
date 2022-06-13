import { useCallback, useState, useEffect } from "react";

import { requestLoginToken } from "../services/authentication.service";

import styles from "../styles/modules/Home.module.scss";

export default function Home({ posts }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = useCallback(() => {
    setLoading(true);
    requestLoginToken(email)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(JSON.stringify(err));
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <div id={styles.homeContainer}>
      <div id={styles.hi}>
        <h1 className="text-green bold">Hi!</h1>
        <h2 className="text-yellow bold">
          <span className="text-grey">I'm</span> Matthew
        </h2>
        <h3 className="text-grey bold">And I write</h3>
        <h3 className="text-green bold">
          <span className="text-yellow">&lt;code /&gt;</span> for the Web
        </h3>
      </div>
      <div id={styles.form}>
        {success ? (
          <>
            <h2 className="text-yellow bold">You've Got Mail!</h2>
            <h3 className="text-grey bold">
              Please check your email Inbox and Junk Mail for the Magic Link
            </h3>
            <div className="centered">
              <button
                className="text-orange"
                onClick={(ev) => {
                  setSuccess(false);
                }}
              >
                Try Again
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-yellow bold">Let's Get Started</h2>
            <h3 className="text-grey bold">
              You'll need an account to get the most out of my apps
            </h3>
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                submit();
              }}
            >
              <div className="formField">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.currentTarget.value)}
                  required="required"
                />
              </div>

              <div className="centered">
                <button className="text-yellow" type="submit">
                  {loading && <i className="fa fa-cog fa-spin"></i>} Submit
                </button>
              </div>
              {error}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
