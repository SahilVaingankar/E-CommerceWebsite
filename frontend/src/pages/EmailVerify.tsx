import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
import { useEffect, useRef, useState } from "react";
// import { AppContext } from "../context/AppContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

  // const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<any>("");

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleInput = (e: any, index: number) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: any) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char: string, index: number) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e: any) => {
    try {
      axios.defaults.withCredentials = true;
      e.preventDefault();
      const otp = inputRefs.current.map((input) => input?.value).join("");
      const { data } = await axios.post(backendUrl + "/auth/verify-account", {
        otp,
      });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    userData && userData.isAccountVerified && navigate("/");
  }, [userData]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <h1
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer">
        LOGO
      </h1>
      <form
        className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm"
        onSubmit={(e) => onSubmitHandler(e)}>
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>
        <div
          onPaste={(e) => handlePaste(e)}
          className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, index: number) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => {
                  inputRefs.current[index] = e;
                }}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
