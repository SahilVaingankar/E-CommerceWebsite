import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const QuantityDropdown = ({ price }: { price: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      {/* {" "}
      <select
        name=""
        id=""
        className="flex items-center w-full border rounded-lg p-1 bg-gray-200 font-semibold pl-5 focus:inset-ring-2 inset-ring-blue-600">
        {Array(30)
          .fill(0)
          .map((_, i) => (
            <option key={i} value={i + 1} className="bg-white w-10">
              Quantity: {i + 1}
            </option>
          ))}
      </select> */}

      <div
        className={`flex items-center w-full border rounded-lg font-semibold overflow-hidden`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        {isOpen ? (
          <ul className="w-full h-30 rounded-md bg-white overflow-auto">
            {Array(30)
              .fill(0)
              .map((_, i) => (
                <li
                  key={i}
                  value={i + 1}
                  className="px-1 hover:bg-gray-100"
                  onClick={() => {
                    setQuantity(i + 1);
                  }}>
                  {i + 1}
                </li>
              ))}
          </ul>
        ) : (
          <div className="flex items-center justify-between h-full w-full bg-gray-200 py-1 px-5">
            <h2>Quantity: {quantity}</h2>
            <MdKeyboardArrowDown />
          </div>
        )}
      </div>
      <p className="ml-5 font-black">Total Price: ${price * quantity}</p>
    </>
  );
};

export default QuantityDropdown;
