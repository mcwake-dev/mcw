/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";

export default function MCWLink({ href, title, icon, newWindow = false }) {
  return (
    <Link href={href}>
      <a
        css={css`
          font-weight: bold;
          text-decoration: none;
          color: var(--light-green);
        `}
        target={newWindow ? "_blank" : "_self"}
      >
        <i
          css={css`
            padding-right: 0.5rem;
            color: var(--light-yellow);
          `}
          className={`fa ${icon}`}
        ></i>{" "}
        {title}
      </a>
    </Link>
  );
}
