import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import SortBtn from "../components/SortBtn";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useStore } from "../stores/store";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useWindowWidth } from "../hooks/useWindowWidth";

const Home = () => {
  const mobileScreen = useWindowWidth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const recommendedBtns: string[] = ["Bed", "Food", "Table", "Pepper", "Steak"];
  const { displayProducts, setAllProducts, filterProducts } = useStore();
  const [selectedRecommendation, setselectedRecommendation] =
    useState<string>("");
  const { isSidebarOpen, setIsSidebarOpen } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setAllProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage - 1 < 1) {
      endPage = Math.min(totalPages, endPage + (1 - (currentPage - startPage)));
    }

    if (currentPage + 1 > totalPages) {
      startPage = Math.max(1, startPage - (1 - (endPage - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <div className="flex overflow-y-auto w-full ">
        <aside
          className={` fixed top-0 left-0 sm:relative sm:flex sm:flex-col bg-black/50 h-[100svh] z-20 w-0 ${
            isSidebarOpen ? "w-full sm:w-[250px]" : "w-0"
          } overflow-hidden transition-all duration-700 md:border-r-2`}>
          <MobileSidebar isClicked={isSidebarOpen} />
          <Sidebar isClicked={isSidebarOpen} />
        </aside>

        <main className="mt-7 grow dark:bg-[#201E1E] dark:text-white h-full">
          <section className="lg:mx-4 p-2 flex flex-col">
            <h2 className="mt-4.75 text-[20px] font-medium">Recommended</h2>
            <section className="mt-2 flex gap-2 flex-wrap">
              {recommendedBtns.map((btn: string, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    selectedRecommendation === btn
                      ? (setselectedRecommendation(""), filterProducts(""))
                      : (setselectedRecommendation(btn), filterProducts(btn));
                  }}
                  className={`${
                    selectedRecommendation === btn
                      ? "bg-[#e7e7e7] hover:bg-[#e7e7e7] dark:text-black"
                      : "hover:bg-[#F4F4F4] transform hover:scale-90 transition duration-75"
                  } border py-1 px-2 rounded-[5px] cursor-pointer dark:hover:text-black dark:border-white`}>
                  {btn}
                </button>
              ))}
            </section>
            <div className="flex items-center">
              {!isSidebarOpen && (
                <button
                  onClick={() => {
                    currentPage > 1 && setCurrentPage((prev) => prev - 1);
                  }}
                  disabled={currentPage === 1}
                  className="disabled:cursor-not-allowed disabled:text-gray-500">
                  <MdArrowBackIosNew className=" hidden lg:block h-20 w-20 hover:border border-blue-700" />
                </button>
              )}
              <div
                className={`sm:flex flex-col sm:px-15 md:px-30 w-full ${
                  isSidebarOpen ? "lg:px-0" : "lg:px-30"
                } sm:w-full justify-center items-center`}>
                <section className="flex justify-between w-full mt-4">
                  <button
                    onClick={() => {
                      setIsSidebarOpen();
                    }}
                    className={`py-1 px-4 rounded-[50px] border cursor-pointer hover:bg-gray-100 dark:bg-[#201E1E] dark:hover:bg-[#D0D0D0] dark:border-white dark:hover:text-black ${
                      isSidebarOpen
                        ? "bg-gray-100 dark:text-black dark:bg-[#D0D0D0]"
                        : "bg-white dark:text-white"
                    }`}>
                    <FiFilter className=" inline mb-1" /> Filter
                  </button>
                  <SortBtn />
                </section>
                <section className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4 w-full">
                  {mobileScreen
                    ? displayProducts.map((product, i: number) => (
                        <ProductCard key={i} {...product} />
                      ))
                    : displayProducts
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          (currentPage - 1) * itemsPerPage + itemsPerPage
                        )
                        .map((product, i: number) => (
                          <ProductCard key={i} {...product} />
                        ))}
                </section>
                {displayProducts.length > 6 && (
                  <div className="mt-2 hidden md:flex items-center justify-center">
                    {getPaginationButtons().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`border dark:border-white px-4 py-2 mx-2 rounded-full cursor-pointer  ${
                          page === currentPage
                            ? "bg-black text-white dark:bg-[#D0D0D0] dark:text-black"
                            : "hover:bg-gray-200 dark:hover:bg-white/10 "
                        }`}>
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!isSidebarOpen && (
                <button
                  onClick={() => {
                    currentPage < totalPages &&
                      setCurrentPage((prev) => prev + 1);
                  }}
                  disabled={currentPage === totalPages}
                  className="disabled:cursor-not-allowed disabled:text-gray-500">
                  <MdArrowForwardIos className="hidden lg:block h-20 w-20 hover:border border-blue-700" />
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
