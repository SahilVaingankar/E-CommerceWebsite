import { useState } from "react";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import { BiSort, BiSortAlt2, BiSortDown } from "react-icons/bi";

const Home = () => {
  const recommendedBtns: string[] = ["bghyu", "mjul", "fgty", "vfty", "dfgf"];
  const [selectedRecommendation, setselectedRecommendation] =
    useState<string>("");
  return (
    <div>
      <Navbar />
      <div className="p-2">
        <h2 className="mt-4.75 text-[20px] font-medium">Recommended</h2>
        <div className="mt-2 flex gap-2 flex-wrap">
          {recommendedBtns.map((btn: string) => (
            <button
              onClick={() => {
                setselectedRecommendation(btn);
              }}
              className={`${
                selectedRecommendation === btn
                  ? "bg-[#e7e7e7] hover:bg-[#e7e7e7]"
                  : "hover:bg-[#F4F4F4]"
              } border py-1 px-2 rounded-[5px] cursor-pointer`}>
              {btn}
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full mt-6">
          <button className="py-1 px-4 rounded-[50px] border">
            <FiFilter className="inline mb-1" /> Filter
          </button>
          <button className="py-1 px-4 rounded-[50px] border">
            <BiSort className="inline mb-1" /> Sort
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
