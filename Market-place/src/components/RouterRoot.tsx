import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import DetailPage from "../pages/DetailPage";
import AddArticle from "../pages/AddArticle";
import Layout from "./Layout";

export default function App2() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/article/:id" element={<DetailPage />} />
          <Route path="/add-article" element={<AddArticle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
