import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    price: number;
    status: "available" | "pending" | "sold" | "deleted";
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const handleDeleteClick = async () => {
    await supabase.from("articles").delete().eq("id", article.id);
  };
  return (
    <div key={article.id}>
      <Link to={`/article/${article.id}`}>
        <h3>{article.title}</h3>
      </Link>
      <p>{article.price} EUR</p>
      <p>Status: {article.status}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
