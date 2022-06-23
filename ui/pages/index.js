/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import PasswordlessSuccess from "../components/index/PasswordlessSuccess";
import PasswordlessForm from "../components/index/PasswordlessForm";

export default function Home() {
  const [success, setSuccess] = useState(false);

  return (
    <div
      css={css`
        @media screen and (min-width: 800px) {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          grid-template-rows: 1fr;
          height: 100%;
          align-items: center;
        }
      `}
    >
      <div
        css={css`
          text-transform: uppercase;
          text-align: center;
          padding-bottom: 2rem;
          margin-bottom: 2rem;
          margin-left: 2rem;
          margin-right: 2rem;
        `}
      >
        <h1
          css={css`
            color: var(--light-green);
            font-weight: bold;
            font-size: 10rem;
          `}
        >
          Hi!
        </h1>
        <h2
          css={css`
            color: var(--light-yellow);
            font-weight: bold;
          `}
        >
          <span
            css={css`
              color: var(--light-grey);
            `}
          >
            I'm
          </span>{" "}
          Matthew
        </h2>
        <h3
          css={css`
            color: var(--light-grey);
            font-weight: bold;
          `}
        >
          And I write
        </h3>
        <h3
          css={css`
            color: var(--light-green);
            font-weight: bold;
          `}
        >
          <span
            css={css`
              color: var(--light-yellow);
            `}
          >
            &lt;code /&gt;
          </span>{" "}
          for the Web
        </h3>
      </div>
      <div>
        {success ? (
          <PasswordlessSuccess setSuccess={setSuccess} />
        ) : (
          <PasswordlessForm setSuccess={setSuccess} />
        )}
      </div>
    </div>
  );
}
