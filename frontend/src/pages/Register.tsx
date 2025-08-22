import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { FC } from "react";
import Form from "../components/Form";
import axiosInstance from "../services/axios";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import { useStore } from "../stores/store";

const Register: FC = () => {
  const navigate = useNavigate();
  const { setLogin } = useStore();

  const handleSubmit = async (formObject: Record<string, string>) => {
    try {
      await axiosInstance.post(
        "http://localhost:5050/auth/register",
        formObject
      );
      setLogin(true);

      toast.success("register successful");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error?.details?.[0]?.message ||
            error.response?.data.message ||
            "Register failed"
        );
      } else {
        toast.error("Unexpected register error");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full px-6 sm:px-0 bg-gradient-to-br from-[#3f1357] via-[#7c3aed] to-[#ec4899]"
      style={{ boxShadow: "8px 8px 24px 0px rgba(66,68,90,1)" }}>
      <BiArrowBack
        className="absolute md:top-1 top-5 lg:top-5 left-3 lg:left-7 h-10 w-10 rounded-full bg-white/50 cursor-pointer hover:bg-gray-200"
        onClick={() => navigate("/")}
      />
      <Form
        onSubmit={handleSubmit}
        title="Register Form"
        text="Create your Account"
        footer={{
          text: "Already have an account?",
          link: "Login here",
          path: "/login",
        }}
        fields={[
          {
            label: "Username",
            input: {
              type: "text",
              name: "username",
              placeholder: "Enter username",
            },
          },
          {
            label: "Email",
            input: {
              type: "email",
              name: "email",
              placeholder: "Enter email",
            },
          },
          {
            label: "Password",
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

export default Register;
