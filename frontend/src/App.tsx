import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import MainLayout from "./layouts/MainLayout";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";
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
  console.log("darkMode : ", darkMode);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/user/getUserData",
          {
            withCredentials: true,
          }
        );
        console.log(response);

        setLogin(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data || "Login failed");
        } else {
          console.log("Unexpected login error", error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
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
          {/* Protected routes */}
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
