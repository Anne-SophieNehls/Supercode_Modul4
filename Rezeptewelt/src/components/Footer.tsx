import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <NavLink to="/" className="logo-container">
        <img src="../img/Icon.png" alt="Logo" /> <h1>Die Rezeptweltl</h1>
      </NavLink>
      <nav className="social_media">
        <a href="">
          <img src="../img/pages.png" alt="insta" />
        </a>
        <a href="">
          <img src="../img/youtube.png" alt="Youtube" />
        </a>
        <a href="">
          <img src="../img/twitter.png" alt="Twitter" />
        </a>
        <a href="../img/pinterest.png">
          <img src="" alt="pinterest" />
        </a>
      </nav>
      <NavLink to="/Login">Login</NavLink>
    </footer>
  );
}
