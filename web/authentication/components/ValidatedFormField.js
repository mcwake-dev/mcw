import { useState, useEffect } from "react";

export default function ValidatedFormField({
  valueName,
  value,
  setValue,
  placeholder,
  ifTrueMessage,
  ifFalseMessage,
  validationService,
  setErrors,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMessage(null);

    validationService(value)
      .then(({ inUse }) => {
        setErrors((current) => {
          return {
            ...current,
            [valueName]: null,
          };
        });
        if (inUse) {
          setMessage(ifTrueMessage);
        } else {
          setMessage(ifFalseMessage);
        }
      })
      .catch((err) => {
        setErrors((current) => {
          return {
            ...current,
            [valueName]: true,
          };
        });
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [value]);

  const showError = !loading && error && value;
  const showTick = !loading && !error && value;

  return (
    <div className="formField">
      <label
        className={showError && error ? "text-orange" : "text-grey"}
        htmlFor={valueName}
      >
        {valueName}
      </label>
      <div className="icon-container">
        {loading && <div className="lds-dual-ring"></div>}
        {showError && <i className="fa fa-times-circle text-orange"></i>}
        {showTick && <i className="fa fa-check-circle text-green"></i>}
      </div>
      <input
        name={valueName}
        className="text-grey"
        value={value}
        onChange={(ev) => setValue(ev.currentTarget.value)}
        type="text"
        placeholder={placeholder}
      />
      <div className="messages">
        <span className="text-orange">{showError && error}</span>
        <br />
        <span className="text-green">{message}</span>
      </div>
    </div>
  );
}
