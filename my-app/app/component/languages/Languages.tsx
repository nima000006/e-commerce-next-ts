"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLanguage } from "@/app/redux/languageSlice";
import SearchBox from "./searchBox/SearchBox";
import Style from "./Languages.module.scss";
import { fetchLanguages, saveLanguage } from "./Languages.service";
import { AppDispatch } from "@/app/redux/store";

const Languages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLanguageFromStore = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [languages, setLanguages] = useState<{ id: string; lang: string }[]>(
    []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const initialLanguage =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedLanguage")
      : null;

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const data = await fetchLanguages();
        setLanguages(data);
        if (initialLanguage) {
          dispatch(setLanguage(initialLanguage));
        } else if (!selectedLanguageFromStore) {
          if (data.length > 0) {
            dispatch(setLanguage(data[0].lang));
            localStorage.setItem("selectedLanguage", data[0].lang);
          }
        }
      } catch (error) {
        console.error("Failed to fetch languages:", error);
      }
    };

    loadLanguages();
  }, [dispatch, initialLanguage, selectedLanguageFromStore]);

  const handleToggle = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  const handleLanguageChange = async (language: string) => {
    dispatch(setLanguage(language));
    localStorage.setItem("selectedLanguage", language);
    setIsOpen(false);

    try {
      await saveLanguage(language);
    } catch (error) {
      console.error("Failed to save selected language:", error);
    }
  };

  const filteredLanguages = languages.filter((item) =>
    item.lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-brown-normal px-[12px]" ref={dropdownRef}>
      <div className="text-brown-normal font-thin cursor-pointer" onClick={handleToggle}>
        {selectedLanguageFromStore || "Select Language"}
      </div>
      {isOpen && (
        <ul
          className={`absolute z-30 top-full font-thin ${Style.drop_down} bg-white-normal 
            ${selectedLanguageFromStore == "En" ? "right-0" : "left-0"}
          `}
        >
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {filteredLanguages.map((item) => (
            <li key={item.id} onClick={() => handleLanguageChange(item.lang)}>
              {item.lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Languages;
