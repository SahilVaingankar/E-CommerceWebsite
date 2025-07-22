import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import SortBtn from "../components/SortBtn";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Rating from "../components/Rating";
import { useStore } from "../stores/store";

interface ProductCardProps {
  title: string;
  rating: number;
  price: number;
  discountPercentage: number;
  images: string[];
  id: number;
}

const Home = () => {
  const recommendedBtns: string[] = ["bghyu", "mjul", "fgty", "vfty", "dfgf"];
  // const [data, setData] = useState<any>("");
  const { filterData, productData, setData } = useStore();
  const [selectedRecommendation, setselectedRecommendation] =
    useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products); // usually you want `response.data`
        console.log(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <div className="flex overflow-y-auto">
        <aside
          className={`fixed top-0 left-0 sm:relative sm:flex sm:flex-col bg-black h-[100svh] z-20 w-0 ${
            isClicked ? "w-full sm:w-[250px]" : "w-0"
          } overflow-hidden transition-all duration-700 md:border-r-2`}>
          <Sidebar isClicked={isClicked} />
        </aside>

        <main className="mt-10">
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
              {filterData.length > 0
                ? filterData.map((product: ProductCardProps, i: number) => (
                    <ProductCard key={i} {...product} />
                  ))
                : productData.map((product: ProductCardProps, i: number) => (
                    <ProductCard key={i} {...product} />
                  ))}
            </section>
          </section>
        </main>
      </div>
      {/* <Rating rating={productData} /> */}
    </>
  );
};

export default Home;
