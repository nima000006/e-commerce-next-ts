"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import SearchIcon from "../searchIcon/SearchIcon";
import Style from "./Search.module.scss";
import CloseIcon from "../closeIcon/CloseIcon";
import { useTranslation } from "../languageProvider/LanguageProvider";

const Search = () => {
  const [searchPopup, setSearchPopup] = useState<boolean>(false);
  const [showClear, setShowClear] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const t = useTranslation();
   const [isSticky, setIsSticky] = useState(false);
   useEffect(() => {
     const handleScroll = () => {
       if (window.scrollY > 100) {
         setIsSticky(true);
       } else {
         setIsSticky(false);
       }
     };

     window.addEventListener("scroll", handleScroll);
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

  const OpenPopup = () => {
    setSearchPopup(true);
  };

  const ClosePopup = () => {
    setSearchPopup(false);
    setShowClear(false);
    setSearchValue("");
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowClear(!!value);
  };
  const clearInput = () => {
    setSearchValue("");
    setShowClear(false);
  };

  return (
    <div className="px-[12]">
      <SearchIcon onClick={OpenPopup} />

      <div
        className={`${Style.popupOverlay} ${
          searchPopup ? Style.active : ""
        } ${isSticky ? Style.top_zero: ""}`}
        onClick={ClosePopup}
      >
        <div
          className={`${Style.popupContent} bg-white-normal`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className=" h-[84px] flex m-auto px-[50px] items-center justify-between max-w-[1100px]">
            <div className="flex w-full">
              <SearchIcon />
              <div className="w-full flex">
                <input
                  className="outline-0 w-[85%] px-[16px] text-[14px] border-0 bg-transparent hover:outline-0 font-thin focus:outline-none text-brown-normal placeholder:text-brown-normal placeholder:font-thin"
                  type="text"
                  value={searchValue}
                  placeholder={`${t("SEARCH_PLACEHOLDER")}`}
                  onChange={onChangeHandler}
                />
                {showClear && (
                  <span
                    className="cursor-pointer text-brown-normal font-thin"
                    onClick={clearInput}
                  >{`${t("CLEAR")}`}</span>
                )}
              </div>
            </div>
            <div>
              <CloseIcon onClick={ClosePopup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
