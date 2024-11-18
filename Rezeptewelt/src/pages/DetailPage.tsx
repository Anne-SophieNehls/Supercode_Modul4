import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function DetailPage() {
  const { id } = useParams();

  const recipesQuery = useQuery({
    queryKey: ["recipes, singleRecipe", id],
    queryFn: async () => {
      const result = await supabase
        .from("recipes")
        .select(
          `  category_id,
      created_at,
      description,
      id,
      instructions,
      name,
      image_url,
      servings,
      ingredients(*),
      categories(
        created_at,
        id,
        name)
                `
        )
        .eq("id", id!)
        .single();

      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  if (recipesQuery.isPending) {
    return "Loading ...";
  }

  if (recipesQuery.isError) {
    return "Sorry, Article not found 404";
  }
  const recipe = recipesQuery.data;

  return (
    <section className="detailOutput">
      {/* <p>daten zu {id}</p> */}
      <div
        className="backgroundImgDetail"
        style={{ backgroundImage: `url(${recipe?.image_url})` }}
      >
        <h1 className="rezept-headline">{recipe?.name}</h1>
      </div>

      <p> Portionen: {recipe?.servings}</p>
      <p>{recipe?.categories?.name}</p>
      <br />
      <p>{recipe?.description}</p>
      <br />
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li>
            {ingredient.name}: {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
      <br />
      <p>{recipe?.instructions}</p>
    </section>
  );
}
