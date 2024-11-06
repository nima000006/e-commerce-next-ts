"use client";
import React, { useState } from "react";
import SearchIcon from "../SearchIcon/SearchIcon";
import Style from "./Search.module.scss"; // Import the SCSS module

const Search = () => {
  const [searchPopup, setSearchPopup] = useState<boolean>(false);

  const OpenPopup = () => {
    setSearchPopup(true);
  };

  const ClosePopup = () => {
    setSearchPopup(false);
  };

  return (
    <div className="px-[12]">
      <SearchIcon onClick={OpenPopup} />

      <div
        className={`${Style.popupOverlay} ${searchPopup ? Style.active : ""}`}
        onClick={ClosePopup}
      >
        <div className={Style.popupContent}>
          <div className="bg-white-normal h-[84px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Search;
