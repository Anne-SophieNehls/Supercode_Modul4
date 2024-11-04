import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const getAllArticles = async () => {
  const result = await supabase.from("recipes").select("*, categories(*)");
  console.log(result.data);
  return result;
};

type Recipies =
  | {
      category_id: string | null;
      created_at: string | null;
      description: string;
      id: string;
      instructions: string;
      name: string;
      servings: number;
      categories: {
        created_at: string;
        id: string;
        name: string | null;
      } | null;
    }[]
  | null;

export default function LovedRecepts() {
  const [food, setFood] = useState<Recipies>(null);

  useEffect(() => {
    getAllArticles().then((result) => {
      setFood(result.data);
    });
  }, []);

  return (
    <section>
      <h2>Die beliebtesten Rezepte</h2>
      <div className="container-loved-recepts">
        <article>
          {food?.map((rezept)=>
          )}
          <img src="" alt="" />
          <h4>Waffel</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            ex.
          </p>
          <button>zum Rezept</button>
        </article>
        <article>
          <img src="" alt="" />
          <h4>Waffel</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            ex.
          </p>
          <button>zum Rezept</button>
        </article>
        <article>
          <img src="" alt="" />
          <h4>Waffel</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            ex.
          </p>
          <button>zum Rezept</button>
        </article>
      </div>
    </section>
  );
}
