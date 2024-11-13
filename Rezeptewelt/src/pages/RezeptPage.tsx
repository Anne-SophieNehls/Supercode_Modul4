import { useEffect, useState } from "react";
import LovedRecepts from "../components/Loved-recepts";
import { Recipies } from "../types/Recipies-types";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ParallaxImg from "../components/parallax-img";

const getNewestRecepts = async () => {
  const result = await supabase
    .from("recipes")
    .select("*, categories(*)")
    .limit(3)
    .order("created_at", { ascending: false });
  console.log(result.data);
  return result;
};

export default function ReceptPage() {
  const [food, setFood] = useState<Recipies>(null);

  useEffect(() => {
    getNewestRecepts().then((result) => {
      setFood(result.data);
    });
  }, []);

  return (
    <section>
      <ParallaxImg />
      <LovedRecepts />
      <h2>Neuste Rezepte</h2>
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
