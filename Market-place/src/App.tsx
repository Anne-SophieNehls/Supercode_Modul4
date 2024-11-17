import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import DetailPage from "./pages/DetailPage";
import AddArticle from "./pages/AddArticle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MessagesPage from "./pages/MessagesPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRout from "./components/ProtectedRout";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/article/:id",
        element: <DetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRout />,
        children: [
          {
            path: "/messages/:articleId/:otherUserId",
            element: <MessagesPage />,
          },
          {
            path: "/add-article",
            element: <AddArticle />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
