import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

type Recipies =
  | {
      category_id: string | null;
      created_at: string | null;
      description: string;
      id: string;
      instructions: string;
      name: string;
      image_url: string | null;
      servings: number;
      categories: {
        created_at: string;
        id: string;
        name: string | null;
      } | null;
    }[]
  | null;

const getAllRecepts = async () => {
  const result = await supabase
    .from("recipes")
    .select("*, categories(*)")
    .limit(3);
  console.log(result.data);
  return result;
};

export default function LovedRecepts() {
  const [food, setFood] = useState<Recipies>(null);

  useEffect(() => {
    getAllRecepts().then((result) => {
      setFood(result.data);
    });
  }, []);

  return (
    <section>
      <h2>Die beliebtesten Rezepte</h2>
      <div className="container-loved-recepts">
        {food?.map((food) => (
          <article>
            <img
              src={
                food.image_url ||
                "https://static.thenounproject.com/png/2932881-200.png"
              }
              alt=""
            />
            <h4>{food.name}</h4>
            <p>{food.description}</p>
            <Link to={`/recept/${food.id}`}> Zum Rezept</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
