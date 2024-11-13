import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { supabase } from "../lib/supabase";

export default function Header() {
  const { user, setUser } = useUserContext();
  const handleLogoutClick = () => {
    setUser(null);
    supabase.auth.signOut();
  };
  return (
    <header>
      <div className="yellow-line"></div>
      <div className="container-nav">
        <NavLink to="/" className="logo-container">
          <img src="../img/Icon.png" alt="Logo" /> <h1>Die Rezeptwelt</h1>
        </NavLink>
        <nav className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recept">Rezepte</NavLink>
          <NavLink to="/about-us">über uns</NavLink>
          <NavLink to="/add-recept">Neues Rezept</NavLink>
          <div>
            {!user && <NavLink to="/login">Login</NavLink>}
            {!user && <NavLink to="/signup">Sign up</NavLink>}
            {/* {user && <button onClick={}>to Profil</button>} */}
            {user && <button onClick={handleLogoutClick}>Logout</button>}
          </div>
        </nav>
      </div>
    </header>
  );
}
