import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function DetailPage() {
  const { id } = useParams();

  const recipesQuery = useQuery({
    queryKey: ["articles, singleArticle", id],
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
      categories(
        created_at,
        id,
        name)
                `
        )
        .eq("id", id!)
        .single();
      return result.data;
    },
  });
  if (recipesQuery.isPending) {
    return "Loading ...";
  }

  if (!recipesQuery.isError) {
    return "Sorry, Article not found 404";
  }
  const recipe = recipesQuery.data;

  return (
    <section>
      <p>daten zu {id}</p>
      <img src={`${recipe?.id}`} alt="picture of food or drink" />
      <h1>{recipe?.name}</h1>
      <p>{recipe?.servings}</p>
      <p>{recipe?.categories?.name}</p>
      <br />
      <p>{recipe?.description}</p>
      <br />
      <ul>
        {/*       <li>{recipe?.incridiens.map}</li>
         */}{" "}
      </ul>
      <br />
      <p>{recipe?.instructions}</p>
    </section>
  );
}

// usePrarams(RRD) mit use single(supabase)
