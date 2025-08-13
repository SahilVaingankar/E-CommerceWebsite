import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { LuLock } from "react-icons/lu";
import { BsEye } from "react-icons/bs";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface Field {
  label?: string;
  input: InputProps;
}

interface Footer {
  text: string;
  link: string;
  path: string;
}

interface FormProps {
  onSubmit?: (data: Record<string, string>) => void;
  title: string;
  text: string;
  footer?: Footer | false;
  fields: Field[];
}

const Form: React.FC<FormProps> = ({
  onSubmit = () => {},
  title,
  text,
  footer = false,
  fields,
}) => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!e.currentTarget.checkValidity()) {
    //   e.currentTarget.reportValidity(); // optional: visually trigger browser's UI
    //   return; // stop execution if form is invalid
    // }
    const formData = new FormData(e.currentTarget);
    const fromEntries = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const keys = Object.keys(fromEntries);
    const missingFields = keys.filter((key) => !fromEntries[key]);

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(", ")} required`);
      return;
    }

    onSubmit(fromEntries);
  };

  return (
    <div className="flex flex-col gap-5 bg-gray-900 p-5 text-white rounded-lg md:w-200 md:px-10 md:gap-10">
      <div className="text-center">
        <h1 className="font-bold text-lg md:text-2xl md:mb-2">{title}</h1>
        <p>{text}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-10">
        {fields.map(({ label, input }, index) => (
          <div className="flex flex-col gap-2" key={index}>
            {label && <label className="block mb-1 font-medium">{label}</label>}
            {label === "Password" ? (
              hidden ? (
                <div className="border-b border-white flex items-center">
                  <input
                    {...input}
                    // required
                    className="focus:outline-none p-1 w-full"
                  />
                  <BsEye
                    className="cursor-pointer"
                    onClick={() => setHidden(false)}
                  />
                </div>
              ) : (
                <div className="border-b border-white flex items-center">
                  <input
                    {...input}
                    type="text"
                    // required
                    className="focus:outline-none p-1 w-full"
                  />
                  <LuLock
                    className="cursor-pointer"
                    onClick={() => setHidden(true)}
                  />
                </div>
              )
            ) : (
              <input
                {...input}
                // required
                className="focus:outline-none border-b border-white p-1"
              />
            )}
          </div>
        ))}
        {title.toLocaleLowerCase() === "login form" && (
          <Link to="/reset-password" className="text-blue-500 cursor-pointer">
            Forgot password?
          </Link>
        )}
        <button type="submit" className="bg-purple-800 py-1 px-2 rounded-lg">
          Submit
        </button>
      </form>
      {footer && (
        <p>
          {footer.text}
          <span
            className="text-purple-500 ml-2 cursor-pointer"
            onClick={() => navigate(footer.path)}>
            {footer.link}
          </span>
        </p>
      )}
    </div>
  );
};

export default Form;
