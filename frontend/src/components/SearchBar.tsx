import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStore } from "../stores/store";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchQuery, productData } = useStore();
  return (
    <div className="relative flex grow gap-1 items-center h-[30px] min-w-[166px] rounded-[25px] border-1">
      <div className="flex items-center justify-center h-[30px] w-8 rounded-l-[25px] border-r-1">
        <FaSearch />
      </div>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        className="placeholder:text-[#9D9A9A] w-30 outline-none"
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          searchQuery(val);
        }}
      />
      {query.length > 0 && (
        <div className="fixed inset-0 bg-black/50 top-12">
          {productData.map((item: any, i: number) => (
            <ul>
              <li key={i}>{item.title}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};
