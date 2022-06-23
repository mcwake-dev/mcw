/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";

import { getPosts } from "../../services/blog-utils";

export default function Latest({ posts }) {
  return (
    <section
      css={css`
        margin: 0.5rem;
        cursor: pointer;
        color: white;
        height: 100%;

        @media screen and (min-width: 800px) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0.5rem;
          align-items: stretch;
        }

        @media screen and (min-width: 1000px) {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0.5rem;
          align-items: stretch;
        }
      `}
    >
      {posts.map((post, index) => (
        <Link key={post.data.title + index} href={`/blog/posts/${post.slug}`}>
          <article
            css={css`
              background-image: url(${post.data.image});
              background-size: cover;
              display: grid;
              align-items: end;
              &:first-of-type {
                grid-row: 1/3;
              }
            `}
          >
            <header
              css={css`
                padding: 1rem;
                background-color: var(--light-orange-trans);
              `}
            >
              <h3>{post.data.title}</h3>
              <time dateTime={post.date}>{post.date}</time>
            </header>
          </article>
        </Link>
      ))}
    </section>
  );
}

export const getStaticProps = () => {
  const posts = getPosts(1);

  return {
    props: {
      posts,
    },
  };
};
