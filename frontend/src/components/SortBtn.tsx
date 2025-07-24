import { BiSort } from "react-icons/bi";
import { useState } from "react";
import { useStore } from "../stores/store";

const SortBtn = () => {
  const { sortProducts } = useStore();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const sortingOptions: ("price" | "rating" | "reviews")[] = [
    "price",
    "rating",
    "reviews",
  ];
  const [selectedSortingOption, setSelectedSortingOption] =
    useState<string>("");

  return (
    <div onBlur={() => setIsClicked(false)}>
      <button
        onClick={() => {
          setIsClicked(true);
        }}
        className="flex justify-center items-center relative group py-1 px-4 rounded-[50px] border cursor-pointer">
        <BiSort className="" /> Sort
        <div
          className={`absolute top-8 ${
            !isClicked ? "hidden" : "block"
          } group-hover:block z-10`}>
          <ul className="m-2 p-1 text-sm w-22 border bg-white rounded-sm">
            {sortingOptions.map((option, i) => (
              <li
                key={i}
                onClick={() => {
                  selectedSortingOption === option
                    ? (setSelectedSortingOption(""), sortProducts("none"))
                    : (setSelectedSortingOption(option), sortProducts(option));
                }}
                className={`${
                  selectedSortingOption === option
                    ? "bg-gray-300 hover:bg-gray-300"
                    : "hover:bg-gray-100"
                } p-1  rounded-sm`}>
                By {option}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </div>
  );
};

export default SortBtn;
