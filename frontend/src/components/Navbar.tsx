import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import axios from "axios";
// import axios from "../services/axios"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/axios";
import { useStore } from "../stores/store";

const Navbar = () => {
  const { login, setLogin, darkMode, toggleMode } = useStore();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [userData, setUserData] = useState<any>("");
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
      const response = await axios.post("http://localhost:5050/auth/logout");
      response.data.success && setUserData(false);
      response.data.success && setLogin(false);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Login failed");
      } else {
        console.log("Unexpected login error", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5050/user/getUserData",
          {
            withCredentials: true,
          }
        );
        console.log(response);

        setUserData(response.data.userData);
        setLogin(true);
        console.log("login", login);

        console.log(userData);
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
    <nav
      className="fixed z-30 top-0 left-0 flex items-center gap-1 md:gap-2 lg:gap-4 bg-white h-12 w-full p-2 md:p-4 lg:p-6 border-b-3 shadow-gray-400 shadow-md"
      //   style={{ boxShadow: "0 3px 6px 0 rgba(0,0,0,0.3)" }}
    >
      <Link to="/">
        <h1 className="text-16 font-bold cursor-pointer">LOGO</h1>
      </Link>
      <SearchBar />
      {/* <div className="flex gap-1 items-center h-[30px] w-[166px] rounded-[25px] border-1">
        <div className="flex items-center justify-center h-[30px] w-8 rounded-l-[25px] border-r-1">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="placeholder:text-[#9D9A9A] w-30"
        />
      </div> */}
      <Link to="/cart">
        {" "}
        <AiOutlineShoppingCart className="h-[25px] w-[25px]" />
      </Link>
      {/* <button className="h-[28px] w-[55px] border-1 rounded-[25px] text-sm">
        Login
      </button> */}
      {userData ? (
        <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">
                Logout
              </li>
              <li
                className="px-2 gap-2 flex justify-between items-center hover:bg-gray-200 cursor-pointer"
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
                  />
                  <span className="block w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-6 pointer-events-none" />
                </div>
              </li>
              {/* <li className="px-2 gap-2 flex justify-between items-center hover:bg-gray-200 cursor-pointer">
                <p>Mode</p>
                <label
                  className="relative inline-block w-12 h-6 cursor-pointer"
                  onClick={() => toggleMode()}>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    readOnly
                  />
                  <span className="block w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-6 pointer-events-none" />
                </label>
              </li> */}
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <button className="h-[28px] w-[55px] border-1 rounded-[25px] text-sm">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
