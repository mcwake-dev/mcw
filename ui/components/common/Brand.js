/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import MCWLink from "./Link";

export default function Brand() {
  return (
    <li
      css={css`
        float: left;
        padding: 0.25rem;
        transition: box-shadow 0.2s ease-in;
        font-size: 2rem;
        &:hover,
        &:focus {
          outline: none;
          box-shadow: 10px 10px 0px 0px rgba(255, 101, 47, 0.6),
            20px 20px 0px 0px rgba(255, 101, 47, 0.4),
            30px 30px 0px 0px rgba(255, 101, 47, 0.2);
        }
      `}
    >
      <MCWLink href="/" title="MCW" icon="fa-server" />
    </li>
  );
}
