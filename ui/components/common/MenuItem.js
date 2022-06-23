/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import MCWLink from "./Link";

const shadowMap = {
  orange: `10px 10px 0px 0px rgba(255, 101, 47, 0.6)
    20px 20px 0px 0px rgba(255, 101, 47, 0.4),
      30px 30px 0px 0px rgba(255, 101, 47, 0.2)`,
  green: `10px 10px 0px 0px rgba(20, 167, 108, 0.6),
      20px 20px 0px 0px rgba(20, 167, 108, 0.4),
      30px 30px 0px 0px rgba(20, 167, 108, 0.2)`,
};

export default function MenuItem({
  href,
  title,
  icon,
  newWindow,
  shadowColour = "green",
}) {
  return (
    <li
      css={css`
        list-style: none;
        float: right;
        padding: 0.25rem;
        width: 8rem;
        border: 1px solid var(--light-grey);
        margin-top: 0.25rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        padding: 0.5rem;
        text-align: center;
        transition: box-shadow 0.2s ease-in;
        &:hover,
        &:focus {
          outline: none;
          box-shadow: ${shadowMap[shadowColour]};
        }
      `}
    >
      <MCWLink href={href} title={title} icon={icon} newWindow={newWindow} />
    </li>
  );
}
