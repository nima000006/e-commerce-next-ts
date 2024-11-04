import React from "react";
import Text from "@/public/locales/en.json";
import Style from "./SearchBox.module.scss";
interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="px-[12px] pt-[12px]">
      <input
        className={Style.search}
        type="text"
        placeholder={Text.SEARCH_PLACEHOLDER}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
};

export default SearchBox;
