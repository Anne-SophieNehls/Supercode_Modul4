import { Outlet, NavLink } from "react-router-dom";
import { useUserContext } from "./userContext";
import { supabase } from "../lib/supabase";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { PopoverContent } from "./ui/popover";
import { useQueryClient } from "node_modules/@tanstack/react-query/build/legacy";

export default function Layout() {
  const { user, setUser } = useUserContext();
  const queryClient = useQueryClient();
  const handleLogoutClick = async () => {
    setUser(null);
    await supabase.auth.signOut();
    queryClient.invalidateQueries();
  };
  return (
    <div>
      <header>
        <NavLink to="/">Home</NavLink> /
        <NavLink to="/add-article">Add Article</NavLink> /
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/signup">Sign up</NavLink>}
        {user && (
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="icon"></Button>
            </PopoverTrigger>
            <PopoverContent>
              <button onClick={handleLogoutClick}>Logout</button>
              <hr />
              <NavLink to="/profile">zum Profil</NavLink>
            </PopoverContent>
          </Popover>
        )}
      </header>
      <Outlet />
    </div>
  );
}
