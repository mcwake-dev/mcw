/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Head from "next/head";
import Menu from "../components/common/Menu";
import { AuthenticationProvider } from "../context/AuthenticationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Head>
        <title>MCW</title>
      </Head>
      <div
        css={css`
          --dark: #272727;
          --dark-grey: #393939;
          --light-grey: #747474;
          --light-orange: #ff652f;
          --light-yellow: #ffe400;
          --light-green: #14a76c;
          --light-orange-trans: #ff652faa;
          font-family: "Lato", sans-serif;
          color: var(--light-grey);
          background-color: var(--dark);
          width: 100vw;
          display: grid;
          grid-template-areas:
            "menu"
            "content"
            "footer";
          grid-template-rows: 4rem minmax(calc(100vh - 6rem), auto) 2rem;
          grid-template-columns: 1fr;
        `}
      >
        <Menu />
        <div
          css={css`
            grid-area: content;
            margin-bottom: 5rem;
          `}
        >
          <Component {...pageProps} />
        </div>
        <footer
          css={css`
            grid-area: footer;
            text-align: center;
            padding: 0.5rem;
          `}
        >
          All Code, Text and Images &copy; Matthew C Wake 2022
        </footer>
      </div>
    </AuthenticationProvider>
  );
}

export default MyApp;
