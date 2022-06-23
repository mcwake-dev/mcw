/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Brand from "./Brand";
import MenuItem from "./MenuItem";

export default function Menu({ props }) {
  return (
    <nav
      css={css`
        grid-area: menu;
        padding: 1rem;
      `}
    >
      <ul
        css={css`
          list-style: none;
        `}
      >
        <Brand />
        <MenuItem href="/experience" title="Experience" icon="fa-code" />
        <MenuItem
          href="https://github.com/mcwake-dev"
          title="Github"
          icon="fa-github"
          newWindow={true}
        />
        <MenuItem href="/blog/latest" title="Blog" icon="fa-github" />
      </ul>
    </nav>
  );
}
