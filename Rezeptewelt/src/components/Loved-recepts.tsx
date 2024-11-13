import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { Recipies } from "../types/Recipies-types";

const getLovedRecepts = async () => {
  const result = await supabase
    .from("recipes")
    .select("*, categories(*)")
    .limit(3)
    .order("rating", { ascending: false });

  return result;
};

export default function LovedRecepts() {
  const [food, setFood] = useState<Recipies>(null);

  useEffect(() => {
    getLovedRecepts().then((result) => {
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
