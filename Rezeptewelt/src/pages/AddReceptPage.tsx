import { useState } from "react";
import { supabase } from "../lib/supabase";

type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
  additionalInfo: string;
};

const emptyIngredient: Ingredient = {
  name: "",
  unit: "",
  quantity: 0,
  additionalInfo: "",
};

export default function RecipeCreatePage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    servings: 1,
    instructions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const recipeResult = await supabase
      .from("recipes")
      .insert({
        ...recipe,
        category_id: "6fe705c2-8f3d-45c9-9b0d-7492bf716551",
      })
      .select("id")
      .single();

    if (recipeResult.error) {
      alert("Something went wrong");
      return;
    }

    const newRecipeId = recipeResult.data.id;

    const ingredientsResult = await supabase.from("ingredients").insert(
      ingredients.map((element) => ({
        name: element.name,
        additional_info: element.additionalInfo,
        unit: element.unit,
        quantity: 0,
        recipe_id: newRecipeId,
      }))
    );

    if (ingredientsResult.error) {
      alert("Sorry, no Ingredients for you!");
      return;
    }
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, emptyIngredient]);
  };
  console.log(ingredients);

  return (
    <div>
      {" "}
      <h3 className="bg-img">
        Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie
        unvergessliche Momente bei Tisch.
      </h3>
      <form onSubmit={handleSubmit}>
        <h1>New Recipe</h1>
        <button>Submit</button>
        <br />
        <br />
        <input
          type="text"
          value={recipe.name}
          required
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="name"
        />
        <br />
        <input
          type="text"
          value={recipe.description}
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="description"
        />
        <br />
        <input
          type="text"
          value={recipe.instructions}
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, instructions: e.target.value }))
          }
          placeholder="instructions"
        />
        <br />
        <input
          type="number"
          value={recipe.servings}
          onChange={(e) =>
            setRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
          }
          placeholder="servings"
        />
        <br />
        <div>
          <h3>Ingredients</h3>
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
          <div>
            {ingredients.map((ingredient, index) => {
              const setIngredient = (newIngredient: Ingredient) =>
                setIngredients((prev) => {
                  const before = prev.slice(0, index);
                  const after = prev.slice(index + 1);
                  return [...before, newIngredient, ...after];
                });

              return (
                <div key={index}>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) =>
                      setIngredient({
                        ...ingredient,
                        name: e.target.value,
                      })
                    }
                    placeholder="name"
                  />
                  <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) =>
                      setIngredient({
                        ...ingredient,
                        unit: e.target.value,
                      })
                    }
                    placeholder="unit"
                  />
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      setIngredient({
                        ...ingredient,
                        quantity: Number(e.target.value),
                      })
                    }
                    placeholder="quantity"
                  />
                  <input
                    type="text"
                    value={ingredient.additionalInfo}
                    onChange={(e) =>
                      setIngredient({
                        ...ingredient,
                        additionalInfo: e.target.value,
                      })
                    }
                    placeholder="additionalInfo"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}
