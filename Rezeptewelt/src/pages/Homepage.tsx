import { ElementRef, useRef, useState } from "react";
import LovedRecepts from "../components/Loved-recepts";
import ParallaxImg from "../components/parallax-img";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";
import CategorySelect from "../components/CategorySelect";
import RecipeCard from "../components/RecipeCard";

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
        .ilike("name", `%${searchText}%`);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
  const recipes = getAllReceptsQuery;

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setSearchText(value);
  };

  if (getAllReceptsQuery.isPending) {
    return "...loading";
  }
  if (getAllReceptsQuery.isError) {
    return "404. Sorry, something went wrong";
  }

  return (
    <div>
      <ParallaxImg />
      <LovedRecepts />
      <section>
        <h1 className="headline">Search a Recipe</h1>
        <form onSubmit={handleSearch}>
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
        <h3 className="headline">hier sind die Suchergebnisse </h3>
        <div className="search-output">
          {recipes.data?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
