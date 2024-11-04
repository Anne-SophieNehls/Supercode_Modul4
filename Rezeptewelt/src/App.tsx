import Layout from "./components/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import Homepage from "./pages/Homepage";
import DetailPage from "./pages/DetailPage";
import ReceptPage from "./pages/RezeptPage";
import AboutUsPage from "./pages/Uber-UnsPage";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/recept/:id",
        element: <DetailPage />,
      },
      {
        path: "/recept",
        element: <ReceptPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
    ],
  },
]);

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

type Ingridience = {
  id: string;
  recipe_id: Recipies;
  name: string;
  quantity: number;
  unit: string;
  additionalInfo: string;
};

function App() {
  const [article, setArticles] = useState<Recipies>(null);

  useEffect(() => {
    getAllArticles().then((result) => {
      setArticles(result.data);
    });
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
