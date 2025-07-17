import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
