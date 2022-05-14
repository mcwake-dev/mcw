import React, { useState, useEffect } from "react";

import styles from "../styles/LocalValidatedField.module.css";
import { validate as useValidation } from "@mcw/validation";

export default function LocalValidatedField({
  fieldName,
  placeholder,
  setValidatedValue,
  schema,
  remoteValidation,
}) {
  const [value, setValue] = useState("");
  const [fieldValidation, setFieldValidation] = useState("");

  useEffect(() => {
    setFieldValidation("");
    useValidation(schema, value).then((result) => {
      const [err, validated] = result;

      if (err) {
        setFieldValidation(err.message);
      } else {
        setValidatedValue(value);
      }
    });
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        name={fieldName}
        value={value}
        onChange={(ev) => {
          setValue(ev.currentTarget.value);
        }}
        required
      />
      <div className={styles.fieldValidation}>
        {remoteValidation || fieldValidation}
      </div>
    </div>
  );
}
