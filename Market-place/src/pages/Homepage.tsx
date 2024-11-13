import { ElementRef, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import ArticleCard from "../components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategorySelect from "@/components/CategorySelect";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("*");
  const inputRef = useRef<ElementRef<"input">>(null);

  const allArticlesQuery = useQuery({
    queryKey: ["supabase", "articles", searchText],
    queryFn: async () => {
      const result = await supabase
        .from("articles")
        .select(
          `
        *,categories(
          id,
          name,
          created_at,
          description
          ),
            profiles (
      id,
      first_name)
    `
        )
        //.lt("price", 100000) // WHERE price < 1000
        // .gt("price", 0)
        .ilike("title", `%${searchText}%`)
        .neq("status", "sold");

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

  if (allArticlesQuery.isPending) {
    return "...loading";
  }
  if (allArticlesQuery.isError || !allArticlesQuery.data) {
    return "Kapuuutt.";
  }

  const articles = allArticlesQuery.data;

  return (
    <div>
      <div>
        <form onSubmit={handleSearch} className="my-6 flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Suche nach Anzeigen in deiner Nähe"
          />
          <CategorySelect
            value={category}
            onChange={(value) => setCategory(value)}
          />
          <Button>Search</Button>
        </form>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
