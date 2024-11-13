import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signUp({ email, password });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
    }
  };

  return (
    <div>
      <h3 className="bg-img">
        Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie
        unvergessliche Momente bei Tisch.
      </h3>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <button>Sign up</button>
      </form>
    </div>
  );
}
