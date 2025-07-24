import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStore } from "../stores/store";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [typedQuery, setTypedQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { searchSuggestions, filterSuggestions, filterProducts } = useStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      filterProducts(query.trim());
      setQuery("");
      setTypedQuery("");
      setCurrentIndex(-1);
    } else if (e.key === "ArrowDown") {
      const newIndex =
        currentIndex < searchSuggestions.length - 1 ? currentIndex + 1 : -1;
      setCurrentIndex(newIndex);
      const newQuery =
        newIndex === -1 ? typedQuery : searchSuggestions[newIndex].title;
      setQuery(newQuery);
    } else if (e.key === "ArrowUp") {
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
      setCurrentIndex(-1);
      setQuery((e.target as HTMLFormElement).value);
      // Move cursor to end of input
      // requestAnimationFrame(() => {
      //   const input = inputRef.current;
      //   if (input) {
      //     input.selectionStart = input.selectionEnd = input.value.length;
      //   }
      // });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedQuery(val);
    setQuery(val);
    setCurrentIndex(-1);
    filterSuggestions(val.trim());
  };

  const displaySearchSuggestions = (item: any) => {
    const title = item.title;
    const queryTrimmed = query.trim().toLowerCase();
    const titleLower = title.toLowerCase();
    const matchIndex = titleLower.indexOf(queryTrimmed);

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
      {query.length > 0 && (
        <div className="fixed inset-0 bg-black/50 top-12">
          <ul className="bg-white py-4">
            {searchSuggestions.map((item, i) => (
              <li
                key={i}
                className={`hover:bg-gray-100 mx-5 py-2 cursor-pointer ${
                  i === currentIndex ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  filterProducts(item.title);
                  setQuery("");
                  setTypedQuery("");
                  setCurrentIndex(-1);
                }}>
                {/* <span>
                  {item.title.split(" ").map((char, i) =>
                    char
                      .trim()
                      .toLowerCase()
                      .startsWith(query.trim().toLocaleLowerCase()) ? (
                      <span className="mr-1">
                        <span key={i} className="font-bold">
                          {char.slice(0, query.length)}
                        </span>
                        <span>{char.slice(query.length)}</span>
                      </span>
                    ) : (
                      <span key={i} className="mr-1">
                        {char}
                      </span>
                    )
                  )}
                </span> */}
                {/* <span>
                  {item.title
                    .split(" ")
                    .filter(Boolean)
                    .map((word, i) => {
                      const lowerQuery = query.toLowerCase();
                      const lowerWord = word.toLowerCase();
                      const isMatch = lowerWord.startsWith(lowerQuery);

                      return (
                        <span key={i} className="mr-1">
                          {isMatch ? (
                            <>
                              <span className="font-bold">
                                {word.slice(0, query.length)}
                              </span>
                              <span>{word.slice(query.length)}</span>
                            </>
                          ) : (
                            word
                          )}{" "}
                        </span>
                      );
                    })}
                </span> */}
                {/* <span> */}
                {displaySearchSuggestions(item)} {/* </span> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
