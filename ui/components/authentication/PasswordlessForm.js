import { useCallback, useState } from "react";

import { requestLoginToken } from "../../services/authentication.service";
import MCWForm from "../common/Form";
import MCWFormField from "../common/FormField";

export default function PasswordlessForm({ setSuccess }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
    <div>
      <h2>Let's Get Started</h2>
      <h3>You'll need an account to get the most out of my apps</h3>
      <MCWForm submit={submit} loading={loading}>
        <MCWFormField
          label="email"
          type="email"
          placeholder="Enter your Email Address"
          value={email}
          setValue={setEmail}
          required={true}
        />
        {error}
      </MCWForm>
    </div>
  );
}
