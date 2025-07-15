import { AiOutlineClose } from "react-icons/ai";

function Sidebar({ isClicked }: { isClicked: boolean }) {
  return (
    <div
      className={`sm:absolute fixed top-5 sm:top-0 left-0 flex flex-col justify-around h-[100svh] w-0 sm:px-2 py-6.5 overflow-hidden ${
        isClicked ? "w-[250px] px-2" : "w-[250px] sm:w-[250px]"
      } bg-[#E8E5E5]`}>
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
        </ul>
      </div>
      <div>
        <h2 className="ml-1 font-semibold text-[36px]">Price range</h2>
        <div className="flex justify-between">
          <label className="text-center">
            <h3>min</h3>
            <input
              type="text"
              placeholder="- -"
              className="bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
            />
          </label>
          <label className="text-center">
            <h3>max</h3>
            <input
              type="text"
              placeholder="- -"
              className="bg-white mx-1 h-9 w-[109px] border text-center placeholder:text-2xl outline-none"
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
}

export default Sidebar;
