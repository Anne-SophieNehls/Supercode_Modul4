import Layout from "./components/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DetailPage from "./pages/DetailPage";
import ReceptPage from "./pages/RezeptPage";
import AboutUsPage from "./pages/Uber-UnsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddRecipies from "./pages/AddReceptPage";
import LoginPage from "./pages/Loginpage";
import RegistrationPage from "./pages/RegistrationPage";
import OwnProfilPage from "./pages/ProfilePage";
import MyRecipesPage from "./pages/MyRecipesPage";

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
      {
        path: "/add-recept",
        element: <AddRecipies />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <RegistrationPage />,
      },
      {
        path: "/own-profil",
        element: <OwnProfilPage />,
      },
      {
        path: "/own-profil/my-recipes",
        element: <MyRecipesPage />,
      },
    ],
  },
]);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
