import "../styles/globals.scss";
import { AuthenticationProvider } from "../context/AuthenticationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <div id="container" className="bg-dark">
        <nav id="menu">
          <ul>
            <li>
              <a id="brand" className="text-yellow p-05" href="/">
                MCW
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
              <a className="text-grey border-grey p-05" href="/blog">
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
