import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div id="container">
      <div className="row">
        <h1 className="text-lightest bold">Hi!</h1>
        <h2 className="text-dark bold">I'm Matthew</h2>
        <h3 className="text-mid-dark bold">And I write</h3>
        <h3 className="text-lightest bold">
          <span className="text-lighter">&lt;code /&gt;</span> for the Web
        </h3>
      </div>
      <div className="row list">
        <ul>
          <li>
            <a href="https://github.com/mcwake-dev" target="_blank">
              <i className="fa fa-github"></i> Github
            </a>
          </li>
          <li>
            <a href="/blog">
              <i className="fa fa-bullhorn"></i> Blog
            </a>
          </li>
          <li>
            <a href="#register">
              <i className="fa fa-cut-key"></i> Register
            </a>
          </li>
          <li>
            <a href="#login">
              <i className="fa fa-sign-in"></i> Login
            </a>
          </li>
        </ul>
      </div>
      <Component {...pageProps} />
      <footer className="footer">
        All Code, Text and Images &copy; Matthew C Wake 2022
      </footer>
    </div>
  );
}

export default MyApp;
