import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "../stores/store";
import { useEffect, useState } from "react";

const MobileSidebar = ({ isClicked }: { isClicked: boolean }) => {
  const {
    setIsSidebarOpen,
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

  const [localMin, setLocalMin] = useState<number | undefined>(undefined);
  const [localMax, setLocalMax] = useState<number | undefined>(Infinity);
  const [localselectedCategory, setLocalSelectedCategory] =
    useState<string>("All");
  const [isApplyed, setIsApplyed] = useState<boolean>(false);

  const handleChange = (
    category: string,
    min: number | undefined,
    max: number | undefined
  ) => {
    setSelectedCategory(category);
    setSidebarFilterProducts(category);
    setMin(min);
    setMax(max);
    setIsSidebarOpen();
    setIsApplyed(true);
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setSidebarFilterProducts("All");
    setMax(undefined);
    setMin(undefined);
    setLocalSelectedCategory("All");
    setLocalMin(undefined);
    setLocalMax(Infinity);
    setIsApplyed(false);
    setIsSidebarOpen();
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

  useEffect(() => {
    setLocalSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div
      className={`md:hidden absolute flex flex-col justify-around px-2 h-[100svh] w-0 pt-15 pb-2 py-6.5 top-0 left-0 overflow-hidden ${
        isClicked ? "w-[250px] sm:fixed" : "w-[250px] sm:w-[250px]"
      } bg-[#E8E5E5]`}>
      <div>
        <div className="flex justify-between text-center items-center h-15">
          <h2 className="ml-1 font-semibold text-[36px]">Categories</h2>
          <button
            className="font-semibold text-[36px] mt-1 p-0.5 border-2 border-[#E8E5E5] hover:border-purple-500"
            onClick={() => {
              isApplyed ? setIsSidebarOpen() : handleReset();
            }}>
            <AiOutlineClose className="sm:hidden h-10 w-10" />
          </button>
        </div>

        <ul className="mt-4 space-y-4">
          <li>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="category-mobile"
                checked={localselectedCategory === "All"}
                value="All"
                className="mr-2 w-[16px] h-[16px] cursor-pointer"
                onChange={() => setLocalSelectedCategory("All")}
              />
              All
            </label>
          </li>
          {categories.map((category, i) => (
            <li key={i}>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="category-mobile"
                  className="mr-2 w-[16px] h-[16px] cursor-pointer "
                  checked={localselectedCategory === category}
                  value={category}
                  onChange={() => setLocalSelectedCategory(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="ml-1 font-semibold text-[36px]">Price range</h2>
        <div className="flex justify-between">
          <label className="text-center">
            <h3 className="mb-1">min ($)</h3>
            <input
              type="number"
              min={0}
              value={localMin === undefined ? "" : localMin}
              placeholder="- -"
              className="pl-5 bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
              onChange={(e) => {
                const val = +e.target.value > 0 ? +e.target.value : undefined;
                setLocalMin(val === undefined || isNaN(val) ? undefined : val);
              }}
            />
          </label>
          <label className="text-center">
            <h3 className="mb-1">max ($)</h3>
            <input
              type="number"
              min={0}
              value={localMax === undefined ? "" : localMax}
              placeholder="- -"
              className="pl-5 bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
              onChange={(e) => {
                const val = +e.target.value > 0 ? +e.target.value : undefined;
                setLocalMax(val === undefined || isNaN(val) ? undefined : val);
              }}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between sm:hidden">
        <button
          className="bg-black text-white px-8 py-2 rounded-[25px] border-3 border-white w-27.5"
          onClick={handleReset}>
          Reset
        </button>
        <button
          className="bg-black text-white px-8 py-2 rounded-[25px] border-3 border-white w-27.5"
          onClick={() =>
            handleChange(
              localselectedCategory,
              localMin ?? 0,
              localMax ?? Infinity
            )
          }>
          Apply
        </button>
      </div>
    </div>
  );
};

export default MobileSidebar;
