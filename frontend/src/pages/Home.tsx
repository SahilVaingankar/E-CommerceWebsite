import { useState } from "react";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import { BiSort } from "react-icons/bi";

const Home = () => {
  const recommendedBtns: string[] = ["bghyu", "mjul", "fgty", "vfty", "dfgf"];
  const [selectedRecommendation, setselectedRecommendation] =
    useState<string>("");
  const sortingOptions: string[] = ["price", "rating", "reviews"];
  const [selectedSortingOption, setSelectedSortingOption] =
    useState<string>("");
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="p-2">
        <h2 className="mt-4.75 text-[20px] font-medium">Recommended</h2>
        <section className="mt-2 flex gap-2 flex-wrap">
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
        </section>
        <section className="flex justify-between w-full mt-6">
          <button className="py-1 px-4 rounded-[50px] border">
            <FiFilter className="inline mb-1" /> Filter
          </button>
          <button className="flex justify-center items-center relative group py-1 px-4 rounded-[50px] border">
            <BiSort className="" /> Sort
            <div className="absolute top-8 hidden group-hover:block z-10">
              <ul className="m-2 p-1 text-sm w-22 border bg-white rounded-sm">
                {sortingOptions.map((option, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      selectedSortingOption === option
                        ? setSelectedSortingOption("")
                        : setSelectedSortingOption(option);
                      // setSelectedSortingOption("");
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
          {/* {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all">
          Login
        </button>
      )} */}
        </section>
        <section className="grid grid-cols-2 gap-5 mt-5">
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
          <div className="bg-black h-30"></div>
        </section>
      </main>
    </>
  );
};

export default Home;
