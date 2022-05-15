import React, { useState, useEffect } from "react";

import styles from "../styles/LocalValidatedField.module.css";
import LocalValidatedField from "./LocalValidatedField";

export default function RemoteValidatedField({
  fieldName,
  placeholder,
  setValidatedValue,
  schema,
  validationUrl,
}) {
  const [value, setValue] = useState("");
  const [fieldValidation, setFieldValidation] = useState("");

  useEffect(() => {
    setFieldValidation("");
    fetch(`${validationUrl}/${value}`)
      .then((response) => response.json())
      .then((data) => {
        setValidatedValue(value);
      })
      .catch((err) => {
        setValidatedValue("");
        setFieldValidation(err.status, err.message);
      });
  }, [value]);

  return (
    <LocalValidatedField
      fieldName={fieldName}
      placeholder={placeholder}
      setValidatedValue={setValidatedValue}
      schema={schema}
      remoteValidation={fieldValidation}
    />
  );
}
