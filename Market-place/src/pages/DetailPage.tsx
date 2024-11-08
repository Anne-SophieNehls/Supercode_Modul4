import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

export default function ArticleDetailPage() {
  const { id } = useParams();

  const articleQuery = useQuery({
    queryKey: ["articles", "singleArticle", id],

    queryFn: async () => {
      const result = await supabase
        .from("articles")
        .select(
          `
          id,
          title,
          price,
          status,
          description,
          categories(
            id,
            name,
            description
            )
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

  articleQuery.data;
  if (articleQuery.isPending) {
    return "Loading...";
  }
  if (articleQuery.isError) {
    return "Sorry, kaputt :/";
  }
  const article = articleQuery.data;

  return (
    <div>
      <p>Guten Tag, ich bin {id}</p>
      <h1>{article.title}</h1>
      <p>{article.status}</p>
      <p>{article.price}</p>
      <p>{article.description}</p>
    </div>
  );
}
