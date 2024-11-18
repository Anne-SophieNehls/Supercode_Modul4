import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/userContext";
import { supabase, getStorageURL } from "../lib/supabase";
import { Link } from "react-router-dom";
import ParallaxImg from "../components/parallax-img";

export default function OwnProfilPage() {
  const { user } = useUserContext();

  const fileRef = useRef<HTMLInputElement>(null);

  const [vorname, setVorname] = useState<string | null>("");
  const [nachname, setNachname] = useState<string | null>("");
  const [nickname, setNickname] = useState<string | null>("");
  const [profilImg, setprofilImg] = useState<string | null>(null);

  const getUserData = async () => {
    const resultprofil = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id!)
      .single();
    return resultprofil;
  };

  const handleFileUpload = async () => {
    const file = fileRef.current?.files?.[0] || null;

    let imagePath: string | null = null;

    if (file) {
      const uploadResult = await supabase.storage
        .from("image")
        .upload(`${user?.id}/${crypto.randomUUID()}`, file, { upsert: true });
      imagePath = uploadResult.data?.fullPath || null;
    }
  };

  useEffect(() => {
    getUserData().then((result) => {
      setVorname(result.data?.first_name || null);
      setNachname(result.data?.last_name || null);
      setprofilImg(result.data?.image!);
      setNickname(result.data?.Nickname || null);
    });
  }, []);

  const imageURL = getStorageURL(profilImg);

  return (
    <div>
      <ParallaxImg />
      <h2 className="headline">Profil</h2>
      <div>
        <div>
          <div className="profil-container">
            <img
              src={
                imageURL ||
                "https://media.istockphoto.com/id/1223671392/de/vektor/standardprofilbild-avatar-fotoplatzhalter-vektor-illustration.jpg?s=612x612&w=0&k=20&c=vtYE5RcgwgrJ1Zg6r66xN25LpXS_xsxZ8NqtvRQ9w6I="
              }
              alt="Profil Image"
            />

            <p>
              Name: {vorname} {nachname}
            </p>
            <p>Nickname: {nickname}</p>
            <p>E-Mail: {user?.email}</p>
            <p>
              Mitglied seit: {new Date(user?.created_at!).toLocaleDateString()}
            </p>
          </div>
          <form>
            <h4>Daten ändern</h4>
            <input type="text" placeholder="Vornamen" />
            <input type="text" placeholder="Nachnamen" />
            <input type="text" placeholder="Nicknamen" />
            <label htmlFor="uploadProfilImg">
              {" "}
              upload your new Profil image hiere:
            </label>
            <input id="uploadProfilImg" type="file" ref={fileRef} />
            <button onClick={handleFileUpload}>Upload new Profil </button>
          </form>
        </div>
      </div>
      <Link to="/own-profil/my-recipes">Eigene Rezepte</Link>
    </div>
  );
}
