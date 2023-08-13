import React, { useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { filteredData } from "../utils/helper";

const SearchTask = ({
  storedTaskData,
  setStoredTaskData,
  isEmpty,
  setSearchedData,
  setSearchValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchData = (searchText, allTaskData) => {
    const data = filteredData(searchText, allTaskData);

    if (data.length === 0) {
      isEmpty(false);
      setSearchValue(searchText);
      setSearchedData("");
    } else {
      isEmpty(false);
      setSearchValue(searchText);
      setSearchedData(data);
    }
  };

  const onChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);
    if (newText) {
      searchData(newText, storedTaskData);
    } else {
      isEmpty(true);
      setStoredTaskData(storedTaskData);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={`w-1/2 flex items-center justify-between space-x-3 px-2 border-2  ${
          isFocused ? "border-blue-600" : "border-gray-300"
        } rounded transition duration-150 ease-in-out`}
      >
        <input
          type="text"
          disabled={storedTaskData.length === 0 ? true : false}
          value={searchText}
          placeholder="Search your task..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          className="outline-none w-full py-1 text-gray-600 text-lg bg-white"
        />
        <button type="button">
          <PiMagnifyingGlass className="text-lg" />
        </button>
      </div>
    </>
  );
};

export default SearchTask;
