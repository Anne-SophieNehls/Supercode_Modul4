import { Link } from "react-router-dom";

interface RecipesProps {
  recipe: {
    category_id: string | null;
    created_at: string | null;
    created_by: string;
    description: string;
    id: string;
    image_url: string | null;
    instructions: string;
    name: string;
    rating: number | null;
    servings: number;
    categories: {
      created_at: string;
      id: string;
      name: string | null;
    } | null;
  };
}

export default function RecipeCard({ recipe }: RecipesProps) {
  const fullImagePath = recipe.image_url;
  /* && "yazwsnizznmnsscpkani.supabase.co/storage/v1/object/public/" +
      recipe.image_url; */

  return (
    <div className="foodcard" key={recipe.id}>
      <img
        src={fullImagePath || "https://placehold.co/600x900"}
        alt="article image"
      />
      <h4>{recipe.name}</h4>

      <p>{recipe.description}</p>
      <Link to={`/recept/${recipe.id}`}>
        {" "}
        <button>Zum Rezept</button>
      </Link>
    </div>
  );
}
