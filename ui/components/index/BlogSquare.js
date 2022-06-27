/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Heading from "../common/Heading";

export default function BlogSquare({ posts }) {
  return (
    <div
      css={css`
        display: grid;
      `}
    >
      <Heading icon="fa-feed" text1="blog" text2="posts" />
      <section>
        {posts.map((post, index) => (
          <a
            key={post.slug + index}
            css={css`
              text-decoration: none;
            `}
            href={`/blog/posts/${post.slug}`}
          >
            <article
              css={css`
                font-family: monospace;
              `}
            >
              <span
                css={css`
                  color: var(--light-green);
                `}
              >
                [{new Date(post.date).toLocaleDateString()}]
              </span>{" "}
              <span
                css={css`
                  color: var(--light-grey);
                  &:hover {
                    color: white;
                  }
                `}
              >
                {post.data.title}
              </span>{" "}
            </article>
          </a>
        ))}
      </section>
    </div>
  );
}
