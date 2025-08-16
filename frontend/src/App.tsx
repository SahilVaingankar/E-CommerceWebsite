import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import MainLayout from "./layouts/MainLayout";
import CartPage from "./pages/CartPage";
import { toast, ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
import axios from "axios";
import { useEffect } from "react";
import { useStore } from "./stores/store";

const App = () => {
  const { setLogin } = useStore();
  const darkMode = useStore((state) => state.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await axios.get("http://localhost:5050/user/getUserData", {
          withCredentials: true,
        });

        setLogin(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data || "Login failed");
        } else {
          toast.error("Unexpected login error");
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div
      className={`${darkMode ? "dark" : ""} min-h-[100svh] dark:bg-[#201E1E]`}>
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
          <Route element={<ProtectedRoutes type={"guest"} />}>
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoutes type={"login"} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
