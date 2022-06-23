/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function MCWForm({ submit, children, loading }) {
  return (
    <form
      css={css`
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-columns: 5rem 20rem;
        margin: 1rem;
        grid-gap: 0.5rem;
      `}
      onSubmit={(ev) => {
        ev.preventDefault();
        submit();
      }}
    >
      {children}
      <button
        css={css`
          color: var(--light-grey);
          grid-column: 2/3;
          background-color: transparent;
          border: 0;
          text-align: center !important;
          font-size: 1.5rem;
          height: 3rem;
          padding-left: 3rem;
          padding-right: 3rem;
          color: white;
          transition: box-shadow 0.2s ease-in;

          &:hover,
          &:focus {
            outline: none;
            box-shadow: 10px 10px 0px 0px rgba(20, 167, 108, 0.6),
              20px 20px 0px 0px rgba(20, 167, 108, 0.4),
              30px 30px 0px 0px rgba(20, 167, 108, 0.2);
          }

          &:active {
            margin-top: 10px;
            margin-left: 10px;
            box-shadow: 10px 10px 0px 0px rgba(20, 167, 108, 0.6),
              20px 20px 0px 0px rgba(20, 167, 108, 0.4);
          }
        `}
        type="submit"
      >
        {loading && <i className="fa fa-cog fa-spin"></i>} Submit
      </button>
    </form>
  );
}
