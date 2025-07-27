import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "../stores/store";
import { useEffect, useState } from "react";

const Sidebar = ({ isClicked }: { isClicked: boolean }) => {
  const { allProducts, setSidebarFilterProducts, setPriceRange } = useStore();
  // const categories = allProducts.map((category) => ([...new Set(category.category)]))
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(Infinity);

  useEffect(() => {
    setPriceRange({ min, max });
  }, [min, max]);

  return (
    <div
      className={`absolute flex flex-col justify-around px-2 h-[100svh] w-0 pt-15 pb-2 py-6.5 top-0 left-0 overflow-hidden ${
        isClicked ? "w-[250px] sm:fixed" : "w-[250px] sm:w-[250px]"
      } bg-[#E8E5E5]`}>
      <div>
        <div className="flex justify-between text-center items-center h-15">
          <h2 className="ml-1 font-semibold text-[36px]">Categories</h2>
          <button className=" sm:hidden font-semibold text-[36px] mt-1 p-0.5 border-2 border-[#E8E5E5] hover:border-purple-500">
            <AiOutlineClose className=" sm:hidden h-10 w-10" />
          </button>
        </div>
        {categories.map((category) => (
          <ul className="mt-4 space-y-4">
            <li>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  className="mr-2 w-[16px] h[16px] cursor-pointer"
                  onClick={() => setSidebarFilterProducts(category)}
                />
                {category}
              </label>
            </li>
          </ul>
        ))}
        {/* <li>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="category"
                className="mr-2 w-[16px] h[16px] cursor-pointer"
              />
              electronics
            </label>
          </li>
          <li>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="category"
                className="mr-2 w-[16px] h[16px] cursor-pointer"
              />
              electronics
            </label>
          </li>
          <li>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="category"
                className="mr-2 w-[16px] h[16px] cursor-pointer"
              />
              electronics
            </label>
          </li>
          <li>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="category"
                className="mr-2 w-[16px] h[16px] cursor-pointer"
              />
              electronics
            </label>
          </li>
        </ul> */}
      </div>
      <div>
        <h2 className="ml-1 font-semibold text-[36px]">Price range</h2>
        <div className="flex justify-between">
          <label className="text-center">
            <h3>min</h3>
            <input
              type="number"
              // value={min}
              placeholder="- -"
              className="bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
              onChange={(e) => {
                setMin(+e.target.value);
              }}
            />
          </label>
          <label className="text-center">
            <h3>max</h3>
            <input
              type="number"
              // value={max}
              placeholder="- -"
              className="bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
              onChange={(e) => {
                setMax(+e.target.value);
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
      <button className="hidden sm:block bg-black text-white px-8 py-2 rounded-[25px] border-3 border-white">
        Reset
      </button>
    </div>
  );
};

export default Sidebar;
