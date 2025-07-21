import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import MainLayout from "./layouts/MainLayout";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        toastClassName="top-12 md:top-10 bg-white text-black rounded-md shadow-md !z-50"
        className=""
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
