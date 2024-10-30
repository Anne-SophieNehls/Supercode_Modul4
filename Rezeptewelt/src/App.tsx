import Layout from "./components/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DetailPage from "./pages/DetailPage";
import ReceptPage from "./pages/rezeptPage";
import AboutUsPage from "./pages/Uber-UnsPage";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
