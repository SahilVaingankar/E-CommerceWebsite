import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import { useStore } from "../stores/store";

const Login = () => {
  const navigate = useNavigate();
  const { setLogin } = useStore();

  const handleSumbit = async (loginInfo: any) => {
    if (loginInfo.password.length >= 5 && loginInfo.password.length <= 20) {
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/login",
          loginInfo,
          {
            withCredentials: true,
          }
        );
        setLogin(true);
        toast.success("login successful");
        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.error?.details?.[0]?.message ||
              error.response?.data.message ||
              "login failed"
          );
        } else {
          toast.error("Unexpected login error");
        }
      }
    } else {
      if (loginInfo.password.length < 5) {
        toast.error("Password must be atleast 5 charectors long");
      } else {
        toast.error("Password must not be grater then 20 charectors");
      }
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full px-6 sm:px-0 bg-gradient-to-br from-[#3f1357] via-[#7c3aed] to-[#ec4899]"
      style={{ boxShadow: "8px 8px 24px 0px rgba(66,68,90,1)" }}>
      <Link to={"/"}>
        <BiArrowBack className="absolute md:top-1 top-5 lg:top-5 left-3 lg:left-7 h-10 w-10 rounded-full bg-white/50 cursor-pointer hover:bg-gray-200" />
      </Link>
      <Form
        onSubmit={handleSumbit}
        title={"Login Form"}
        text={"Login to your account"}
        footer={{
          text: "don't have an account?",
          link: "register here",
          path: "/register",
        }}
        fields={[
          {
            label: "Email (dummyuser@gmail.com)",
            input: {
              type: "email",
              name: "email",
              placeholder: "Enter email",
            },
          },
          {
            label: "Password (dummypassword)",
            input: {
              type: "password",
              name: "password",
              placeholder: "Enter password",
            },
          },
        ]}
      />
    </div>
  );
};

export default Login;
