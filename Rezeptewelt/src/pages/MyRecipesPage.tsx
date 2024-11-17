import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../context/userContext";
import { supabase } from "../lib/supabase";
export default function MyRecipesPage() {
  const { user } = useUserContext();
  const getAllReceptsQuery = useQuery({
    queryKey: ["supabase", "recipes", user?.id],
    queryFn: async () => {
      const result = await supabase
        .from("recipes")
        .select("*, categories(*)")
        .eq("created_by", user!.id);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
  const recipes = getAllReceptsQuery.data;

  return (
    <section>
      <h2>Deine Rezepte</h2>
      <div className="container-loved-recepts">
        {recipes?.map((recipe) => (
          <article>
            <img
              src={
                recipe.image_url ||
                "https://static.thenounproject.com/png/2932881-200.png"
              }
              alt=""
            />
            <h4>{recipe.name}</h4>
            <p>Servings {recipe.servings}</p>
            <p>geschrieben am {recipe.created_at}</p>
            <p>Bewertet mit: {recipe.rating} Sternen</p>
            <hr />
            <p>{recipe.description}</p>
            <hr />
            <p>{recipe.instructions}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
