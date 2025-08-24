import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LuLock } from "react-icons/lu";
import { BsEye } from "react-icons/bs";
import PopOver from "./PopOver";
import { BiCopy } from "react-icons/bi";

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
  const [copied, setCopied] = useState(false);
  const message = copied ? "copied" : "copy";
  const textColor = copied ? "lightgreen" : "white";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const copy = (text: string) => {
    // Gets data inside the bracket
    const match = text.match(/\(([^)]+)\)/);

    setCopied(true);
    if (match && match[1]) {
      const content = match[1]; // <- captured content inside brackets

      navigator.clipboard
        .writeText(content)
        .then(() => {
          console.log("Copied:", content);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    } else {
      console.warn("No text found inside brackets.");
    }
  };

  useEffect(() => {
    if (!copied) return;

    const id = setTimeout(() => setCopied(false), 1000);

    return () => clearTimeout(id); // cleanup if copied changes again
  }, [copied]);

  return (
    <div className="flex flex-col gap-5 bg-gray-900 p-5 text-white rounded-lg md:w-200 md:px-10 md:gap-10 mx-5">
      <div className="text-center">
        <h1 className="font-bold text-lg md:text-2xl md:mb-2">{title}</h1>
        <p>{text}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-10">
        {fields.map(({ label, input }, index) => (
          <div className="flex flex-col gap-2" key={index}>
            {label && (
              <label className="block mb-1 font-medium">
                {label.endsWith(")") ? (
                  <div className="flex gap-2 items-center">
                    <span>{label} </span>
                    <div>
                      <PopOver message={message} text={textColor}>
                        <BiCopy
                          className={`mt-1 cursor-pointer`}
                          onClick={() => copy(label)}
                        />
                      </PopOver>
                    </div>
                  </div>
                ) : (
                  label
                )}
              </label>
            )}
            {label?.startsWith("Password") ? (
              hidden ? (
                <div className="border-b border-white flex items-center">
                  <input {...input} className="focus:outline-none p-1 w-full" />
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
                className="focus:outline-none border-b border-white p-1"
              />
            )}
          </div>
        ))}
        {title.toLocaleLowerCase() === "login form" && (
          <PopOver
            top={30}
            url="https://github.com/SahilVaingankar/E-CommerceWebsite/blob/main/backend/src/routes/authRoutes.ts#L29"
            message="Depreciated requires original email to receive opt">
            <Link
              to="/reset-password"
              className="text-blue-500 cursor-pointer hover:text-blue-400 active:text-blue-500">
              <p>Forgot password?</p>
            </Link>
          </PopOver>
        )}
        <button
          type="submit"
          className="bg-purple-800 py-1 px-2 rounded-lg hover:bg-purple-600 cursor-pointer active:bg-purple-800 active:scale-90 transition-all duration-75">
          Submit
        </button>
      </form>
      {footer && (
        <p>
          {footer.text}
          <span
            className="text-purple-500 ml-2 cursor-pointer hover:text-purple-400 active:text-purple-500"
            onClick={() => navigate(footer.path)}>
            {footer.link}
          </span>
        </p>
      )}
    </div>
  );
};

export default Form;
