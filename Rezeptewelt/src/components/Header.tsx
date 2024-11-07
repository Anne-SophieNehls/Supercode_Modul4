import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="yellow-line"></div>
      <div className="container-nav">
        <NavLink to="/" className="logo-container">
          <img src="../img/Icon.png" alt="Logo" /> <h1>Die Rezeptweltl</h1>
        </NavLink>
        <nav className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recept">Rezepte</NavLink>
          <NavLink to="/about-us">über uns</NavLink>
          <NavLink to="/add-recept">Neues Rezept</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </div>
      <h3 className="bg-img">
        Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie
        unvergessliche Momente bei Tisch.
      </h3>
    </header>
  );
}
