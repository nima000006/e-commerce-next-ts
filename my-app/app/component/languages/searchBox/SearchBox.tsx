"use client";
import React from "react";
import Style from "./SearchBox.module.scss";
import { useTranslation } from "../../languageProvider/LanguageProvider";
interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, setSearchTerm }) => {
    const t = useTranslation();
  return (
    <div className="px-[12px] pt-[12px]">
      <input
        className={Style.search}
        type="text"
        placeholder={`${t("SEARCH_PLACEHOLDER")}`}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
};

export default SearchBox;
