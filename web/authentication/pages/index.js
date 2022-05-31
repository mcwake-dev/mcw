import { useCallback, useState } from "react";
import ValidatedFormField from "../components/ValidatedFormField";
import { emailInUse } from "../services/user.service";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const submit = useCallback(() => {
    alert("Oh dear");
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
        <h2 className="text-yellow bold">Let's Get Started</h2>
        <h3 className="text-grey bold">
          You'll need an account to get the most out of my apps
        </h3>
        <p className="text-grey">
          Enter your email address below. It will be stored securely and only
          used to send magic links for login. If you don't have an account yet,
          you can create one here.
        </p>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            submit();
          }}
        >
          <ValidatedFormField
            valueName="email"
            value={email}
            setValue={setEmail}
            placeholder="Enter your email address"
            ifTrueMessage="Please click or tap Submit to get your magic link"
            ifFalseMessage="Please complete the form below to get your magic link"
            validationService={emailInUse}
            setErrors={setErrors}
          />
          <div className="formField">
            <button
              className="text-yellow border-yellow"
              type="submit"
              disabled={errors.email}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
