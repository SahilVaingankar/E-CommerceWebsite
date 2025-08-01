import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

const Navbar = () => {
  return (
    <nav
      className="fixed z-30 top-0 left-0 flex items-center gap-1 md:gap-2 lg:gap-4 bg-white h-12 w-full p-2 md:p-4 lg:p-6 border-b-3 shadow-gray-400 shadow-md"
      //   style={{ boxShadow: "0 3px 6px 0 rgba(0,0,0,0.3)" }}
    >
      <Link to="/">
        <h1 className="text-16 font-bold cursor-pointer">LOGO</h1>
      </Link>
      <SearchBar />
      {/* <div className="flex gap-1 items-center h-[30px] w-[166px] rounded-[25px] border-1">
        <div className="flex items-center justify-center h-[30px] w-8 rounded-l-[25px] border-r-1">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="placeholder:text-[#9D9A9A] w-30"
        />
      </div> */}
      <Link to="/cart">
        {" "}
        <AiOutlineShoppingCart className="h-[25px] w-[25px]" />
      </Link>
      <button className="h-[28px] w-[55px] border-1 rounded-[25px] text-sm">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
