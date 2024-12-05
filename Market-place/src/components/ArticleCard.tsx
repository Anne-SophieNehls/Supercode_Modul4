import { useUserContext } from "../components/userContext";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQueryClient } from "node_modules/@tanstack/react-query/build/legacy";

interface ArticleCardProps {
  article: {
    category_id: string;
    created_at: string;
    created_by: string;
    description: string;
    id: string;
    image: string | null;
    price: number;
    price_negotiable: boolean;
    status: "available" | "pending" | "sold" | "deleted";
    title: string;
    favorites: { id: number }[];
    profiles: {
      id: string;
      first_name: string;
    } | null;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { user } = useUserContext();
  const isOwnArticle = article.created_by === user?.id;

  const queryClient = useQueryClient();

  const handleDeleteClick = async () => {
    await supabase.from("articles").delete().eq("id", article.id);
  };
  const fullImagePath =
    article.image &&
    "yazwsnizznmnsscpkani.supabase.co/storage/v1/object/public/" +
      article.image;
  //yazwsnizznmnsscpkani.supabase.co/storage/v1/object/public/articles_images/css_einfuehrung_position_level_2_1.png

  const isFavorited = article.favorites.length > 0;

  const handleFavorite = async () => {
    if (!isFavorited) {
      const result = await supabase
        .from("favorites")
        .insert({ article_id: article.id });
    } else {
      await supabase.from("favorites").delete().eq("article_id", article.id);
    }
    // zum neu fetchen beim klick, damit das feedback vom button auch angezeigt wird
    queryClient.invalidateQueries({ queryKey: ["supabase", "articles"] });
  };

  return (
    <div className="" key={article.id}>
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md mb-2">
        <img
          src={fullImagePath || "https://placehold.co/600x900"}
          alt="article image"
        />
      </AspectRatio>
      <Link to={`/articles/${article.id}`}>
        <h3 className="font-semibold">{article.title}</h3>
      </Link>
      <Button variant={"ghost"} onClick={handleFavorite}>
        {isFavorited ? "♥︎" : "♡"}
      </Button>
      <p className="text-neutral-600">{article.description}</p>
      <p className="text-neutral-600">
        Angeboten von {article.profiles?.first_name}
      </p>
      <p className="font-semibold">{article.price} EUR</p>
      <p>Status: {article.status}</p>
      {isOwnArticle && (
        <Button variant="default" size="default" onClick={handleDeleteClick}>
          Delete
        </Button>
      )}
    </div>
  );
}
