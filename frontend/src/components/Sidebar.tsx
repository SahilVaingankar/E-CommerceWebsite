import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "../stores/store";
import { useEffect } from "react";

const Sidebar = ({ isClicked }: { isClicked: boolean }) => {
  const {
    allProducts,
    setSidebarFilterProducts,
    setPriceRange,
    min,
    setMin,
    max,
    setMax,
    selectedCategory,
    setSelectedCategory,
  } = useStore();
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  const handleRadioChangeCategory = (category: string) => {
    setSelectedCategory(category);
    setSidebarFilterProducts(category);
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setSidebarFilterProducts("All");
    setMax(undefined);
    setMin(undefined);
  };

  useEffect(() => {
    if (min && max) {
      setPriceRange({ min, max });
    } else if (min) {
      setPriceRange({ min, max: Infinity });
    } else if (max) {
      setPriceRange({ min: 0, max });
    } else {
      setPriceRange({ min: 0, max: Infinity });
    }
  }, [min, max]);

  return (
    <div
      className={`hidden absolute sm:flex flex-col justify-around px-2 h-[100svh] w-0 pt-15 pb-2 py-6.5 top-0 left-0 overflow-hidden ${
        isClicked ? "w-[250px] sm:fixed" : "w-[250px] sm:w-[250px]"
      } bg-[#D9D9D9]`}>
      <div>
        <div className="flex justify-between text-center items-center h-15">
          <h2 className="ml-1 font-semibold text-[36px]">Categories</h2>
          <button className=" sm:hidden font-semibold text-[36px] mt-1 p-0.5 border-2 border-[#E8E5E5] hover:border-purple-500">
            <AiOutlineClose className=" sm:hidden h-10 w-10" />
          </button>
        </div>
        <ul className="mt-4 space-y-4">
          <li>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="category-desktop"
                checked={selectedCategory === "All"}
                value={"All"}
                className="mr-2 w-[16px] h-[16px] cursor-pointer"
                onChange={() => handleRadioChangeCategory("All")}
              />
              All
            </label>
          </li>
        </ul>
        {categories.map((category, i) => (
          <ul className="mt-4 space-y-4" key={i}>
            <li>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="category-desktop"
                  className="mr-2 w-[16px] h-[16px] cursor-pointer"
                  onClick={() => handleRadioChangeCategory(category)}
                />
                {category}
              </label>
            </li>
          </ul>
        ))}
      </div>
      <div>
        <h2 className="ml-1 font-semibold text-[36px]">Price range</h2>
        <div className="flex justify-between">
          <label className="text-center">
            <h3 className="mb-1">min ($)</h3>
            <input
              type="number"
              min={0}
              value={min === undefined ? "" : min}
              placeholder="- -"
              className="pl-5 bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
              onChange={(e) => {
                setMin(+e.target.value > 0 ? +e.target.value : undefined);
              }}
            />
          </label>
          <label className="text-center">
            <h3 className="mb-1">max ($)</h3>
            <input
              type="number"
              min={0}
              value={max === undefined ? "" : max}
              max={Infinity}
              placeholder="- -"
              className="pl-5 bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
              onChange={(e) => {
                setMax(+e.target.value > 0 ? +e.target.value : undefined);
              }}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-between sm:hidden">
        <button className="bg-black text-white px-8 py-2 rounded-[25px] border-3 border-white">
          Cancel
        </button>
        <button className="bg-black text-white px-8 py-2 rounded-[25px] border-3 border-white">
          Apply
        </button>
      </div>
      <button
        onClick={() => handleReset()}
        className="hidden sm:block bg-black text-white px-8 py-2 rounded-[25px] border-3 border-white">
        Reset
      </button>
    </div>
  );
};

export default Sidebar;
