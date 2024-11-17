import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <NavLink to="/" className="logo-container">
        <img src="../img/Icon.png" alt="Logo" /> <h1>Die Rezeptwelt</h1>
      </NavLink>
      <div className="social_media">
        <p>Sozial Media</p>
        <nav>
          <a href="https://github.com/Anne-SophieNehls">
            <img src="../img/pages.png" alt="insta" />
          </a>
          <a href="https://www.youtube.com/">
            <img src="../img/youtube.png" alt="Youtube" />
          </a>
          <a href="https://x.com/">
            <img src="../img/twitter.png" alt="Twitter" />
          </a>
          <a href="https://www.youtube.com/">
            <img src="../img/pinterest.png" alt="pinterest" />
          </a>
        </nav>
      </div>
      <NavLink to="/Login">Login</NavLink>
    </footer>
  );
}
