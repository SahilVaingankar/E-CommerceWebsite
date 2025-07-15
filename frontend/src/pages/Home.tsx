import { useState } from "react";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import SortBtn from "../components/SortBtn";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const recommendedBtns: string[] = ["bghyu", "mjul", "fgty", "vfty", "dfgf"];
  const [selectedRecommendation, setselectedRecommendation] =
    useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <>
      <header>
        <Navbar />
      </header>

      <div className="flex overflow-y-auto mt-5">
        <aside
          className={`absolute sm:relative sm:flex sm:flex-col bg-black min-h-[100svh] z-20 w-0 ${
            isClicked ? "w-full sm:w-[250px]" : "w-0"
          } overflow-hidden transition-all duration-700 md:border-r-2`}>
          <Sidebar isClicked={isClicked} />
        </aside>

        <main className=" mt-10">
          <section className="p-2 flex flex-col">
            <h2 className="mt-4.75 text-[20px] font-medium">Recommended</h2>
            <section className="mt-2 flex gap-2 flex-wrap">
              {recommendedBtns.map((btn: string, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    selectedRecommendation === btn
                      ? setselectedRecommendation("")
                      : setselectedRecommendation(btn);
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
              <button
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
                className="py-1 px-4 rounded-[50px] border">
                <FiFilter className="inline mb-1" /> Filter
              </button>
              <SortBtn />
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
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
