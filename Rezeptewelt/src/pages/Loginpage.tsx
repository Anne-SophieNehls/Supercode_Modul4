import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import ParallaxImg from "../components/parallax-img";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
      navigate("/");
    }
  };

  return (
    <div>
      <ParallaxImg />
      <h1 className="headline">Login</h1>
      <form className="login--sign-up" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Passwort</label>
          <input
            id="password"
            type="password"
            placeholder="passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
