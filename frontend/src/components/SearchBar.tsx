import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [navigated, setNavigated] = useState(false);
  const [query, setQuery] = useState("");
  const [typedQuery, setTypedQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const {
    searchSuggestions,
    filterSuggestions,
    filterProducts,
    reset,
    setSidebarFilterProducts,
    setSelectedRecommendation,
  } = useStore();

  useEffect(() => {
    if (!navigated) {
      const timeout = setTimeout(() => {
        filterSuggestions(query.trim());
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      reset();
      setSelectedRecommendation("");
      setSidebarFilterProducts("All");
      filterProducts(query.trim());
      if (query) {
        navigate("/");
      }
      setQuery("");
      setTypedQuery("");
      setCurrentIndex(-1);
    } else if (e.key === "ArrowDown") {
      setNavigated(true);
      const newIndex =
        currentIndex < searchSuggestions.length - 1 ? currentIndex + 1 : -1;
      setCurrentIndex(newIndex);
      const newQuery =
        newIndex === -1 ? typedQuery : searchSuggestions[newIndex].title;
      setQuery(newQuery);
    } else if (e.key === "ArrowUp") {
      setNavigated(true);
      const newIndex =
        currentIndex > -1 ? currentIndex - 1 : searchSuggestions.length - 1;
      setCurrentIndex(newIndex);
      const newQuery =
        newIndex === -1 ? typedQuery : searchSuggestions[newIndex].title;
      setQuery(newQuery);
      // Move cursor to end of input
      requestAnimationFrame(() => {
        const input = inputRef.current;
        if (input) {
          input.selectionStart = input.selectionEnd = input.value.length;
        }
      });
    } else if (e.key === "Backspace") {
      setNavigated(false);
      setCurrentIndex(-1);
      setQuery((e.target as HTMLFormElement).value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNavigated(false);
    const val = e.target.value;
    setTypedQuery(val);
    setQuery(val);
    setCurrentIndex(-1);
  };

  const displaySearchSuggestions = (item: any) => {
    const title = item.title;
    const queryTrimmed = query.trim().toLowerCase();
    const titleLower = title.toLowerCase();
    let matchIndex;
    if (queryTrimmed.length === 1) {
      matchIndex = title.indexOf(query.toUpperCase());
    } else {
      matchIndex = titleLower.indexOf(queryTrimmed);
    }

    if (matchIndex === -1) {
      return title;
    }

    const before = title.slice(0, matchIndex);
    const match = title.slice(matchIndex, matchIndex + queryTrimmed.length);
    const after = title.slice(matchIndex + queryTrimmed.length);

    return (
      <>
        {before}
        <span className="font-bold">{match}</span>
        {after}
      </>
    );
  };

  useEffect(() => {
    query.length > 0 && setShowOverlay(true);
  }, [query]);

  return (
    <div className="relative flex grow gap-1 items-center h-[30px] min-w-[166px] rounded-[25px] border-1">
      <div className="flex items-center justify-center h-[30px] w-8 rounded-l-[25px] border-r-1">
        <FaSearch />
      </div>
      <input
        type="text"
        ref={inputRef}
        value={query}
        placeholder="Search..."
        className="placeholder:text-[#9D9A9A] w-full px-2 outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showOverlay && query.length > 0 && searchSuggestions.length > 0 ? (
        <div
          className="fixed inset-0 bg-black/50 top-12"
          onClick={() => setShowOverlay(false)}>
          <ul className="bg-white dark:bg-[#201E1E] dark:text-white py-4">
            {searchSuggestions.map((item, i) => (
              <li
                key={i}
                className={`px-1 hover:bg-gray-100 dark:hover:bg-[#D0D0D0] dark:hover:text-black mx-5 py-2 cursor-pointer ${
                  i === currentIndex
                    ? "bg-gray-100 dark:bg-[#D0D0D0] dark:text-black"
                    : ""
                }`}
                onClick={() => {
                  setQuery("");
                  setTypedQuery("");
                  setCurrentIndex(-1);
                  setSidebarFilterProducts("All");
                  filterProducts(item.title);
                  reset();
                }}>
                {displaySearchSuggestions(item)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        showOverlay && (
          <div
            className={`${
              query.length > 0 ? "fixed" : "hidden"
            } inset-0 bg-black/50 top-12 flex justify-center items-center dark:text-black`}
            onClick={() => setShowOverlay(false)}>
            <p className="bg-white px-4 py-2">No results found</p>
          </div>
        )
      )}
    </div>
  );
};
