import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axios";
import { useStore } from "../stores/store";
import PopOver from "./PopOver";

const Navbar = () => {
  const { setLogin, darkMode, toggleMode, login } = useStore();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [userData, setUserData] = useState<any>("");
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/auth/send-verify-otp");

      if (data.success) {
        navigate("/email-verify");
        setLogin(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendUrl + "/auth/logout");
      response.data.success && setUserData(false);
      response.data.success && setLogin(false);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.success(error.response?.data || "Login failed");
      } else {
        toast.error("Unexpected login error");
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          backendUrl + "/user/getUserData",
          {
            withCredentials: true,
          }
        );

        setUserData(response.data.userData);
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
    <nav
      className="fixed z-30 top-0 left-0 flex items-center gap-1 md:gap-2 lg:gap-4 bg-white dark:bg-[#201E1E] dark:text-white h-12 w-full p-2 md:p-4 lg:p-6 border-b-3 shadow-gray-400 dark:shadow-gray-800 shadow-md"
      //   style={{ boxShadow: "0 3px 6px 0 rgba(0,0,0,0.3)" }}
    >
      <Link to="/">
        <h1 className="text-16 font-bold cursor-pointer">LOGO</h1>
      </Link>
      <SearchBar />
      <Link to="/cart">
        {login ? (
          <AiOutlineShoppingCart className="h-[25px] w-[25px]" />
        ) : (
          <PopOver message="requies login" right={-35}>
            <AiOutlineShoppingCart className="h-[25px] w-[25px]" />
          </PopOver>
        )}
      </Link>
      {userData ? (
        <div
          className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer"
          tabIndex={0}
          onClick={() => {
            setIsProfileOpen(true);
          }}
          onBlur={() => {
            setIsProfileOpen(false);
          }}>
          {userData.name[0].toUpperCase()}
          <div
            className={`absolute ${
              isProfileOpen ? "block" : "hidden"
            } group-hover:block top-0 right-0 text-black rounded pt-10 -z-10`}>
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm dark:bg-gray-900 dark:text-white">
              {!userData.isAccountVerified && (
                <PopOver
                  message="Depreciated require real email to receive OTP"
                  url="https://github.com/SahilVaingankar/E-CommerceWebsite/blob/main/backend/src/routes/authRoutes.ts#L26-L27"
                  right={110}
                  top={0}>
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer group">
                    <p>Verify Email</p>
                  </li>
                </PopOver>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer pr-10">
                Logout
              </li>
              <li
                className="px-2 dark:hover:bg-gray-700 gap-2 flex justify-between items-center hover:bg-gray-200 cursor-pointer"
                onClick={() => toggleMode()}>
                <p>Mode</p>
                {/* <input
                  type="checkbox"
                  className="appearance-none relative w-6 h-3 bg-gray-300 rounded-full
               checked:bg-blue-600 cursor-pointer transition-colors
               before:content-[''] before:absolute before:-top-0.5 before:-left-0.5 
               before:w-4 before:h-4 before:bg-black before:rounded-full before:shadow-md
               before:transition-transform checked:before:translate-x-4"
                />{" "} */}

                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    readOnly
                  />
                  <span className="block w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-6 pointer-events-none" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <button className="h-[28px] w-[55px] border-1 rounded-[25px] text-sm cursor-pointer">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
