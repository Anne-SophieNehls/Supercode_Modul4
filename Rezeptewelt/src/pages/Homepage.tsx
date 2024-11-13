import { ElementRef, useRef, useState } from "react";
import LovedRecepts from "../components/Loved-recepts";
import ParallaxImg from "../components/parallax-img";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function Homepage() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("*");
  const inputRef = useRef<ElementRef<"input">>(null);

  const getAllReceptsQuery = useQuery({
    queryKey: ["supabase", "recipes", searchText],
    queryFn: async () => {
      const result = await supabase
        .from("recipes")
        .select("*, categories(*)")
        .ilike("title", `%${searchText}%`);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setSearchText(value);
    console.log(searchText);
  };

  if (getAllReceptsQuery.isPending) {
    return "...loading";
  }
  if (getAllReceptsQuery.isError || !getAllReceptsQuery.data) {
    return "404. Sorry, something went wrong";
  }

  return (
    <div>
      <ParallaxImg />
      <LovedRecepts />
      <section>
        <h2>Search a Recipe</h2>
        <form onSubmit={handleSearch} className="my-6 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Suche nach Anzeigen in deiner Nähe"
          />
          <CategorySelect
            value={category}
            onChange={(value) => setCategory(value)}
          />
          <button>Search</button>
        </form>
        <h3>Here ist the search result </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
