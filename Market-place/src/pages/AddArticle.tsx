import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { QueryData } from "@supabase/supabase-js";

export default function AddArticle() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const categorySelectRef = useRef<HTMLSelectElement>(null);

  const [categories, setCategories] = useState<CategorieData>([]);

  const getAllCategories = async () => {
    const result = await supabase.from("categories").select("*");
    return result;
  };
  type CategorieData = QueryData<ReturnType<typeof getAllCategories>>;

  useEffect(() => {
    getAllCategories().then((result) => setCategories(result.data || []));
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await supabase.from("articles").insert({
      title: titleInputRef.current!.value,
      description: descriptionInputRef.current!.value,
      price: Number(priceInputRef.current!.value),
      category_id: categorySelectRef.current!.value,
      image: imageUrl || null,
    });
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={titleInputRef} type="text" placeholder="Title" required />
        <input
          ref={descriptionInputRef}
          type="text"
          name="description"
          required
          placeholder="Beschreibung"
        />
        <input ref={priceInputRef} type="number" placeholder="Preis" required />
        <input
          value={imageUrl}
          name="imageurl"
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          placeholder="Bild URL"
        />
        <select ref={categorySelectRef} name="category" id="">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button>Anzeige Erstellen</button>
      </form>
    </div>
  );
}
