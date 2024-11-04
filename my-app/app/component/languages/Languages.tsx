"use client";
import React, { useState, useEffect, useRef } from "react";
import SearchBox from "./searchBox/SearchBox";
import Style from "./Languages.module.scss";

const Languages = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("En");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = ["En", "Fa", "Es", "De", "Fr"]; 

  const handleToggle = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="text-brown-normal cursor-pointer" onClick={handleToggle}>
        {selectedLanguage}
      </div>
      {isOpen && (
        <ul
          className={`absolute top-full ${Style.drop_down} bg-white-normal right-[-5px]`}
        >
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {filteredLanguages.map((lang) => (
            <li key={lang} onClick={() => handleLanguageChange(lang)}>
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Languages;
