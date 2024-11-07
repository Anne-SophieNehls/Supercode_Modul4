import { ElementRef, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { QueryData, createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

type Article =
  | {
      id: string;
      titel: string;
      descripton: string;
      categories: {
        id: string;
        name: string;
        description: string | null;
      } | null;
    }[]
  | null;

export default function Homepage() {
  const [articles, setArticles] = useState<ArticleData>([]);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);

  const getAllArticles = async (searchText: string) => {
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
      //.lt("price", 1000) // WHERE price < 1000
      // .gt("price", 0)
      .ilike("title", `%${searchText}%`);
    // .neq("status", "sold");
    return result;
  };

  type ArticleData = QueryData<ReturnType<typeof getAllArticles>>;

  useEffect(() => {
    getAllArticles(searchText).then((result) => {
      setArticles(result.data || []);
    });
  }, [searchText]);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setSearchText(value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input ref={inputRef} type="text" />
        <button>Search</button>
      </form>
      <div>
        {articles?.map((article) => (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.price} EUR</p>
            <p>Status: {article.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
