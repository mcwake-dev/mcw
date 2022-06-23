/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function MCWFormField({
  label,
  type = "text",
  value,
  setValue,
  required,
  placeholder,
}) {
  return (
    <>
      <label
        css={css`
          text-align: right;
          text-transform: uppercase;
          margin-right: 0.5rem;
          font-size: 1.2rem;
        `}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        css={css`
          color: var(--light-grey);
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--light-grey);
          font-size: 1.2rem;
          font-weight: bold;
          margin-left: 0.5rem;
          padding-left: 0.5rem;
          max-width: 20rem;
          height: 2rem;

          &:focus {
            outline: none;
            border-bottom: 1px solid white;
          }

          &:invalid {
            border-bottom: 1px solid var(--light-orange);
          }

          &:valid {
            border-bottom: 1px solid var(--light-green);
          }
        `}
        name={label}
        type={type}
        value={value}
        onChange={(ev) => setValue(ev.currentTarget.value)}
        required={required}
        placeholder={placeholder}
      />
    </>
  );
}
