/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import MenuItem from "../common/MenuItem";

export default function Post({ backgroundImage, title, author, children }) {
  return (
    <article
      css={css`
        color: white;
        padding: 2rem;
        display: grid;
        grid-template-columns: 0.1fr 1fr 0.1fr;
      `}
    >
      <main
        css={css`
          grid-column: 2/3;
        `}
      >
        <header
          css={css`
            background-image: url(/img/posts/${backgroundImage});
            background-size: cover;
            display: grid;
            align-items: end;
            height: 20rem;
          `}
        >
          <div
            css={css`
              background-color: var(--light-orange-trans);
              padding: 0.5rem;
            `}
          >
            <h2>{title}</h2>
            <h3>By {author}</h3>
          </div>
        </header>
        {children}
        <footer>
          <MenuItem title="Back" href="/blog/latest" icon="fa-backward" />
        </footer>
      </main>
    </article>
  );
}
