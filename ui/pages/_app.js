import Head from "next/head";
import Menu from "../components/common/Menu";

import { AuthenticationProvider } from "../context/AuthenticationProvider";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Head>
        <title>MCW</title>
      </Head>
      <Menu />
      <main>
        <Component {...pageProps} />
      </main>
      <footer>&copy; Matthew C Wake 2022</footer>
    </AuthenticationProvider>
  );
}

export default MyApp;
