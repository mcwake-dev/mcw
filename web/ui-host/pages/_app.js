import Head from "next/head";

import "../styles/globals.scss";
import Brand from "../components/Brand";
import { AuthenticationProvider } from "../context/AuthenticationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Head>
        <title>MCW</title>
      </Head>
      <div id="container" className="bg-dark">
        <nav id="menu">
          <ul>
            <li>
              <Brand />
            </li>
            <li>
              <a className="text-grey border-grey p-05" href="/experience">
                <i className="fa fa-database"></i>
                <i className="fa fa-nodejs"></i>
                <i className="fa fa-html5"></i>
                <i className="fa fa-css3"></i> Experience
              </a>
            </li>
            <li>
              <a
                className="text-grey border-grey p-05"
                href="https://github.com/mcwake-dev"
                target="_blank"
              >
                <i className="fa fa-github"></i> Github
              </a>
            </li>
            <li>
              <a className="text-grey border-grey p-05" href="/latest">
                <i className="fa fa-bullhorn"></i> Blog
              </a>
            </li>
          </ul>
        </nav>
        <Component id="content" {...pageProps} />
        <footer id="footer" className="text-grey">
          All Code, Text and Images &copy; Matthew C Wake 2022
        </footer>
      </div>
    </AuthenticationProvider>
  );
}

export default MyApp;
