import { useRef, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddArticleForm() {
  const titelRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    supabase.from("articles").insert({
      title: titelRef.current!.value,
      description: descriptionRef.current!.value,
      price: Number(priceRef.current!.value),
      category_id: "",
      image: 
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Titel" ref={titelRef} />
        <input type="text" placeholder="Beschreibung" ref={descriptionRef} />
        <input type="number" placeholder="Preis" ref={priceRef} />
        <input type="text" placeholder="Bild URL" value={imgUrl} onChange={(e)=> setImgUrl(e.target.value)} />

        <button>Anzeige erstellen</button>
      </form>
    </div>
  );
}
