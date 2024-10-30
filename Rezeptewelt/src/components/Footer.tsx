import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <NavLink to="/" className="logo-container">
        <img src="" alt="Logo" /> <h1>Die Rezeptweltl</h1>
      </NavLink>
      <nav className="social_media">
        <a href="">
          <img src="" alt="insta" />
        </a>
        <a href="">
          <img src="" alt="Youtube" />
        </a>
        <a href="">
          <img src="" alt="Twitter" />
        </a>
        <a href="">
          <img src="" alt="pinterest" />
        </a>
      </nav>
      <NavLink to="/Login">Login</NavLink>
    </footer>
  );
}
