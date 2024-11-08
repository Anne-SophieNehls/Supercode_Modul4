import { Outlet, NavLink } from "react-router-dom";
import { useUserContext } from "./userContext";
import { supabase } from "../lib/supabase";

export default function Layout() {
  const { user, setUser } = useUserContext();
  const handleLogoutClick = () => {
    setUser(null);
    supabase.auth.signOut();
  };
  return (
    <div>
      <header>
        <NavLink to="/">Home</NavLink> /
        <NavLink to="/add-article">Add Article</NavLink> /
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/signup">Sign up</NavLink>}
        {user && <button onClick={handleLogoutClick}>Logout</button>}
      </header>
      <Outlet />
    </div>
  );
}
