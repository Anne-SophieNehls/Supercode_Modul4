import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
// import { useEffect, useState } from "react";
//import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function DetailPage() {
  const { id } = useParams();

  //! mit Query kann man die errors und lodings abfangen, sowie auf schon mal geladenen Daten aufbauen, sodas ein neues aufrufen der Seite nicht so ewig dauert.
  const articleQuery = useQuery({
    queryKey: ["articles, singleArticle", id], //! ist da damit beim langsamen laden keine alten Daten mit angezeigt werden. er identifizert, um was für eine Query es sich handelt.(ist immer ein Array) wenn er leer ist, hat er nix zum identifitieren. so kann er nicht die falschen Datensätze nicht
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
                created_at,
                description
                )
                `
        )
        .eq("id", id!)
        .single();
      return result.data;
    },
  });

  //# Hier ist der use Effect fetch
  //   const [article, setArticle] = useState<ArticleData | null>(null);
  /*  const getArticle = async (id: string) => {
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
            created_at,
            description
            )
          `
      )
      .eq("id", id)
      .single();
    return result;
  };

  type ArticleData = QueryData<ReturnType<typeof getArticle>>;

  useEffect(() => {
    if (id) {
      getArticle(id).then((result) => setArticle(result.data));
    }
  }, []); */

  if (articleQuery.isPending) {
    return "Loading ...";
  }

  if (!articleQuery.isError) {
    return "Sorry, Article not found 404";
  }

  const article = articleQuery.data;

  return (
    <section>
      <p>daten zu {id}</p>
      <h1>{article.titel}</h1>
      <p>{article.description}</p>
    </section>
  );
}
