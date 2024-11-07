import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-article">Add Article</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer> Impressum (nicht vorhanden)</footer>
    </div>
  );
}
