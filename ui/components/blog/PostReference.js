/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function PostReference({ title, href }) {
  return (
    <cite
      css={css`
        display: block;
        padding: 0.2rem;
      `}
    >
      <a
        css={css`
          color: var(--light-grey);
        `}
        href={href}
      >
        {title}
      </a>
    </cite>
  );
}
